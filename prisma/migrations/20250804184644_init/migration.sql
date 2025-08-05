-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('NORMAL', 'HIGH', 'LOW');

-- CreateEnum
CREATE TYPE "public"."NotifyMethod" AS ENUM ('SMS', 'WA', 'EMAIL');

-- CreateTable
CREATE TABLE "public"."Party" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "secondName" TEXT NOT NULL,
    "mobile1" TEXT NOT NULL,
    "mobile2" TEXT,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" SERIAL NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "priority" "public"."Priority" NOT NULL,
    "notifyVia" "public"."NotifyMethod" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TaskParty" (
    "taskId" INTEGER NOT NULL,
    "partyId" INTEGER NOT NULL,

    CONSTRAINT "TaskParty_pkey" PRIMARY KEY ("taskId","partyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Party_email_key" ON "public"."Party"("email");

-- AddForeignKey
ALTER TABLE "public"."TaskParty" ADD CONSTRAINT "TaskParty_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."TaskParty" ADD CONSTRAINT "TaskParty_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "public"."Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
