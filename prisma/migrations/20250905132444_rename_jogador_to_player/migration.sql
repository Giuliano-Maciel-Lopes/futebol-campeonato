/*
  Warnings:

  - The values [JOGADOR] on the enum `PlayerRole` will be removed. If these variants are still used in the database, this will fail.
  - The values [JOGADOR] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PlayerRole_new" AS ENUM ('PLAYER', 'CAPITAO');
ALTER TABLE "public"."Player" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."Player" ALTER COLUMN "role" TYPE "public"."PlayerRole_new" USING ("role"::text::"public"."PlayerRole_new");
ALTER TYPE "public"."PlayerRole" RENAME TO "PlayerRole_old";
ALTER TYPE "public"."PlayerRole_new" RENAME TO "PlayerRole";
DROP TYPE "public"."PlayerRole_old";
ALTER TABLE "public"."Player" ALTER COLUMN "role" SET DEFAULT 'PLAYER';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('ADMIN', 'PLAYER');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."User" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'PLAYER';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Player" ALTER COLUMN "role" SET DEFAULT 'PLAYER';

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'PLAYER';
