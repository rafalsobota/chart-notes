-- CreateTable
CREATE TABLE "Measurement" (
    "date" DATETIME NOT NULL,
    "componentAFlowKgH" REAL NOT NULL,
    "componentBFlowKgH" REAL NOT NULL,
    "coolantTemperatureC" REAL NOT NULL,
    "reactorOutletTemperatureC" REAL NOT NULL,
    "reactorHotspotTemperatureC" REAL NOT NULL,
    "yieldPercent" REAL NOT NULL,
    "productFlowTonsPerDay" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "metrics" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "Note_date_fkey" FOREIGN KEY ("date") REFERENCES "Measurement" ("date") ON DELETE NO ACTION ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Measurement_date_key" ON "Measurement"("date");
