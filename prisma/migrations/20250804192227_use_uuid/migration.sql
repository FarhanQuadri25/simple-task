/*
  Warnings:

  - The primary key for the `Party` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_partyId_fkey";

-- AlterTable
ALTER TABLE "public"."Party" DROP CONSTRAINT "Party_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Party_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Party_id_seq";

-- AlterTable
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "partyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Task_id_seq";

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "public"."Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
