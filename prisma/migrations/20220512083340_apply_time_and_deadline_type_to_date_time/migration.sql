/*
  Warnings:

  - Changed the type of `applyTime` on the `License` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `deadline` on the `License` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "License" DROP COLUMN "applyTime",
ADD COLUMN     "applyTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "deadline",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;
