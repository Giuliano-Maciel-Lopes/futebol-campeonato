/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Team" DROP COLUMN "imageUrl",
ADD COLUMN     "photoUrl" TEXT;
