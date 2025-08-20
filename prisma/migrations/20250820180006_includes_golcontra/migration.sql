-- AlterEnum
ALTER TYPE "public"."EventType" ADD VALUE 'OWN_GOAL';

-- DropForeignKey
ALTER TABLE "public"."MatchEvent" DROP CONSTRAINT "MatchEvent_playerId_fkey";

-- AlterTable
ALTER TABLE "public"."MatchEvent" ALTER COLUMN "playerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."MatchEvent" ADD CONSTRAINT "MatchEvent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
