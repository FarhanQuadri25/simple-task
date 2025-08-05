/*
  Warnings:

  - You are about to drop the column `taskId` on the `Party` table. All the data in the column will be lost.
  - Added the required column `partyId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Party" DROP CONSTRAINT "Party_taskId_fkey";

-- AlterTable
ALTER TABLE "public"."Party" DROP COLUMN "taskId";

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "partyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "public"."Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
