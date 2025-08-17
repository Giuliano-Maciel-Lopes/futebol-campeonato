/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `captainId` on the `Team` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."Team" DROP CONSTRAINT "Team_captainId_fkey";

-- AlterTable
ALTER TABLE "public"."Player" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Team" ALTER COLUMN "updatedAt" DROP DEFAULT,
DROP COLUMN "captainId",
ADD COLUMN     "captainId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_captainId_key" ON "public"."Team"("captainId");

-- AddForeignKey
ALTER TABLE "public"."Team" ADD CONSTRAINT "Team_captainId_fkey" FOREIGN KEY ("captainId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
