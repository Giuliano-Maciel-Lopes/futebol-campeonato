import { prisma } from "@/database/prisma-config";
import { AppError } from "./AppEroor";

export async function findUserById(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new AppError("Usuário não encontrado.", 404);
  }
  return {user};
}

export async function findPlayerById(id: string) {
  const player = await prisma.player.findUnique({ where: { id } });
  if (!player) {
    throw new AppError("player não encontrado.", 404);
  }
  return {player};
}

export async function findTeamById(id: string) {
  const team = await prisma.team.findUnique({ where: { id } , include:{players:true} });
  if (!team) {
    throw new AppError("Time não encontrado.", 404);
  }
  return {team};
}

export async function findInviteById(id: string) {
  const invite = await prisma.invite.findUnique({ where: { id } });
  if (!invite) {
    throw new AppError("Convite não encontrado.", 404);
  }
  return {invite};
}
export async function findMatchById(id: string) {
  const match = await prisma.match.findUnique({ where: { id } });
  if (!match) {
    throw new AppError("partida não encontrado.", 404);
  }
  return {match};
}

export async function findPlayerByUserId(userId: string) {
  const player = await prisma.player.findUnique({ where: { userId } });
  if (!player) throw new AppError("Player não encontrado.", 404);
  return { player };
}
