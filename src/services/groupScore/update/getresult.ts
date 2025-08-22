import { Prisma } from "@prisma/client";

export function getResult(
  scoreA: number,
  scoreB: number
): Prisma.GroupScoreUpdateInput {
  if (scoreA > scoreB) {
    return {
      played: { increment: 1 },
      win: { increment: 1 },
      drawn: { increment: 0 },
      lost: { increment: 0 },
      points: { increment: 3 },
      goalsFor: { increment: scoreA },
      goalsAgainst: { increment: scoreB },
      goalDifference: { increment: scoreA - scoreB },
    };
  }

  if (scoreA === scoreB) {
    return {
      played: { increment: 1 },
      win: { increment: 0 },
      drawn: { increment: 1 },
      lost: { increment: 0 },
      points: { increment: 1 },
      goalsFor: { increment: scoreA },
      goalsAgainst: { increment: scoreB },
      goalDifference: { increment: scoreA - scoreB },
    };
  }

  return {
    played: { increment: 1 },
    win: { increment: 0 },
    drawn: { increment: 0 },
    lost: { increment: 1 },
    points: { increment: 0 },
    goalsFor: { increment: scoreA },
    goalsAgainst: { increment: scoreB },
    goalDifference: { increment: scoreA - scoreB },
  };
}
