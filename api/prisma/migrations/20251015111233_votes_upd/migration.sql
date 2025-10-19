/*
  Warnings:

  - You are about to drop the column `code` on the `Vote` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Vote" DROP CONSTRAINT "Vote_code_fkey";

-- DropIndex
DROP INDEX "public"."Vote_code_key";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "code";
