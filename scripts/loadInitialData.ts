import fs from 'fs';
import path from 'path';
import { Measurement, PrismaClient } from '@prisma/client';
import { parse as parseDate } from 'date-fns';

const prisma = new PrismaClient();

const loadMeasurementsFromCSV = (filePath: string): Measurement[] => {
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\n');
  lines.shift(); // Remove header
  const now = new Date();
  return lines.map((line) => {
    const [date, componentAFlowKgH, componentBFlowKgH, coolantTemperatureC, reactorOutletTemperatureC, reactorHotspotTemperatureC, yieldPercent, productFlowTonsPerDay] = line.split("\t");
    return {
      date: parseDate(date, 'dd.MM.yy', now),
      componentAFlowKgH: parseFloat(componentAFlowKgH),
      componentBFlowKgH: parseFloat(componentBFlowKgH),
      coolantTemperatureC: parseFloat(coolantTemperatureC),
      reactorOutletTemperatureC: parseFloat(reactorOutletTemperatureC),
      reactorHotspotTemperatureC: parseFloat(reactorHotspotTemperatureC),
      yieldPercent: parseFloat(yieldPercent),
      productFlowTonsPerDay: parseFloat(productFlowTonsPerDay),
    }
  });
}

const main = async (): Promise<void> => {
  const csvFilePath = path.resolve(__dirname, 'initialData.csv');
  const initialData = loadMeasurementsFromCSV(csvFilePath);
  for (const measurement of initialData) {
    await prisma.measurement.create({
      data: measurement
    });
  }
}

main().then(() => {
  console.log("✔ Loaded Initial Data");
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
