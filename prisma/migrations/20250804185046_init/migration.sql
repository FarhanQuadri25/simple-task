/*
  Warnings:

  - You are about to drop the `TaskParty` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `taskId` to the `Party` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."TaskParty" DROP CONSTRAINT "TaskParty_partyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."TaskParty" DROP CONSTRAINT "TaskParty_taskId_fkey";

-- AlterTable
ALTER TABLE "public"."Party" ADD COLUMN     "taskId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."TaskParty";

-- AddForeignKey
ALTER TABLE "public"."Party" ADD CONSTRAINT "Party_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
