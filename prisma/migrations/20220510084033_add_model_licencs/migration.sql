-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "CPUID" TEXT NOT NULL,
    "macAddress" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "applyTime" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "manageDeviceNum" INTEGER NOT NULL DEFAULT 0,
    "functionModel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "License_CPUID_key" ON "License"("CPUID");

-- CreateIndex
CREATE UNIQUE INDEX "License_macAddress_key" ON "License"("macAddress");
