/*
  Warnings:

  - Added the required column `cand` to the `Pic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pic" ADD COLUMN     "cand" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pic" ADD CONSTRAINT "Pic_cand_fkey" FOREIGN KEY ("cand") REFERENCES "Candident"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;
