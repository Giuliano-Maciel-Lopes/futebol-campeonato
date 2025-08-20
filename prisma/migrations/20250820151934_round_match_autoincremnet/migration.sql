/*
  Warnings:

  - Made the column `round` on table `Match` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
CREATE SEQUENCE "public".match_round_seq;
ALTER TABLE "public"."Match" ALTER COLUMN "round" SET NOT NULL,
ALTER COLUMN "round" SET DEFAULT nextval('"public".match_round_seq');
ALTER SEQUENCE "public".match_round_seq OWNED BY "public"."Match"."round";
