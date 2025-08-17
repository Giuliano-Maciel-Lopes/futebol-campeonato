/*
  Warnings:

  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `totalPlayers` on the `Team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameCart]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameCart` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Position" AS ENUM ('GOLEIRO', 'DEFENSOR', 'MEIOCAMPO', 'ATACANTE');

-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'JOGADOR';

-- DropForeignKey
ALTER TABLE "public"."Player" DROP CONSTRAINT "Player_teamId_fkey";

-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "name",
ADD COLUMN     "nameCart" TEXT NOT NULL,
DROP COLUMN "position",
ADD COLUMN     "position" "public"."Position" NOT NULL,
ALTER COLUMN "teamId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Team" DROP COLUMN "totalPlayers";

-- CreateIndex
CREATE UNIQUE INDEX "Player_nameCart_key" ON "public"."Player"("nameCart");

-- AddForeignKey
ALTER TABLE "public"."Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
