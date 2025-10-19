/*
  Warnings:

  - You are about to drop the column `name` on the `Pic` table. All the data in the column will be lost.
  - Added the required column `pic` to the `Pic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pic" DROP COLUMN "name",
ADD COLUMN     "pic" TEXT NOT NULL;
