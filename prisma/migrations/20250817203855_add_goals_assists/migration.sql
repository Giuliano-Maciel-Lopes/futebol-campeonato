/*
  Warnings:

  - You are about to drop the column `identidade` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "identidade",
ADD COLUMN     "assists" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "goals" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "userId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'JOGADOR';

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_key" ON "public"."Player"("userId");

-- AddForeignKey
ALTER TABLE "public"."Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
