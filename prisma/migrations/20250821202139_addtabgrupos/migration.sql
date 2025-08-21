-- CreateEnum
CREATE TYPE "public"."MatchStatus" AS ENUM ('SCHEDULED', 'ONGOING', 'FINISHED');

-- AlterTable
ALTER TABLE "public"."Match" ADD COLUMN     "status" "public"."MatchStatus" NOT NULL DEFAULT 'SCHEDULED';

-- CreateTable
CREATE TABLE "public"."GroupScore" (
    "id" UUID NOT NULL,
    "groupId" UUID NOT NULL,
    "teamId" UUID NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "played" INTEGER NOT NULL DEFAULT 0,
    "win" INTEGER NOT NULL DEFAULT 0,
    "drawn" INTEGER NOT NULL DEFAULT 0,
    "lost" INTEGER NOT NULL DEFAULT 0,
    "goalsFor" INTEGER NOT NULL DEFAULT 0,
    "goalsAgainst" INTEGER NOT NULL DEFAULT 0,
    "goalDifference" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GroupScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupScore_teamId_key" ON "public"."GroupScore"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupScore_groupId_teamId_key" ON "public"."GroupScore"("groupId", "teamId");

-- AddForeignKey
ALTER TABLE "public"."GroupScore" ADD CONSTRAINT "GroupScore_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GroupScore" ADD CONSTRAINT "GroupScore_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "public"."Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
