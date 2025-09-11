/*
  Warnings:

  - A unique constraint covering the columns `[teamId,positionIndex]` on the table `Player` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Player" ADD COLUMN     "positionIndex" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Player_teamId_positionIndex_key" ON "public"."Player"("teamId", "positionIndex");
