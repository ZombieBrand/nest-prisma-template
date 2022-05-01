-- CreateTable
CREATE TABLE "Coffee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "flavor" TEXT[],

    CONSTRAINT "Coffee_pkey" PRIMARY KEY ("id")
);
