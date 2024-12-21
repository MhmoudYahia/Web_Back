/*
  Warnings:

  - Added the required column `seatsPerRow` to the `Stadium` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vipRows` to the `Stadium` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stadium" ADD COLUMN     "seatingRows" INTEGER,
ADD COLUMN     "seatsPerRow" INTEGER NOT NULL,
ADD COLUMN     "vipRows" INTEGER NOT NULL;
