import { prisma } from "@/database/prisma-config";
import type {  MatchBodyInput } from "@/schemazod/match/create";
import { findTeamById } from "@/utils/prismaHelpersutils";
type matchProps = {
  data:MatchBodyInput}

export async function createMatch ({data}:matchProps) {
await findTeamById(data.team1Id)
await findTeamById(data.team2Id)

 const dataMatch =  await prisma.match.create({data})

  return { dataMatch};
};
