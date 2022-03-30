import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import * as client from '../../../lib/api/types';
import { makeClientMeasurements } from '../_convertions';

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<client.Measurement[]>
) {

  const year = req.query.year ? typeof req.query.year == "string" ? Number(req.query.year) : Number(req.query.year[0]) : new Date().getFullYear();
  const yearBeginning = new Date(year, 0, 1);
  const yearEnd = new Date(year + 1, 0, 1);

  const [measurements, notes] = await Promise.all([
    prisma.measurement.findMany({ where: { date: { gte: yearBeginning, lt: yearEnd } }, select: { date: true, reactorOutletTemperatureC: true, reactorHotspotTemperatureC: true }, orderBy: { date: 'asc' } }),
    prisma.note.findMany({ where: { date: { gte: yearBeginning, lt: yearEnd } }, orderBy: { date: 'asc' } })
  ]);

  const clientMeasurements = makeClientMeasurements(measurements, notes);
  res.status(200).json(clientMeasurements);
}
