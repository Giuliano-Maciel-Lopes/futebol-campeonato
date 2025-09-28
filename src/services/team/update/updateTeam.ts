import { prisma } from "@/database/prisma-config";
import { AppError } from "@/utils/AppEroor";
import { TeamUpdateInput } from "@/schemazod/team/update";
import { Role } from "@prisma/client";
import { findTeamById, findPlayerById } from "@/utils/prismaHelpersutils";
import { CheckPermission } from "./checkdPermission";
import { IndexPlayerIndexMaxIndice } from "@/services/utils/indexPlayersmax";
import { PopulateGropScore } from "../utils/populateGroupScore";

interface UpdateTeamRequest {
  id: string;
  data: TeamUpdateInput;
  role: Role; // role do user
  userId: string;
}

export async function updateTeam({
  id,
  data,
  role,
  userId,
}: UpdateTeamRequest) {
  // apenas capitao e admin pode mudar
  const { team } = await findTeamById(id);

  await CheckPermission({ data, userId, role, team }); //

  if (data.captainId && team.captainId !== data.captainId) {
    const { player: CaptainPast } = await findPlayerById(team.captainId);
    const { player: CaptainNEW } = await findPlayerById(data.captainId);

    if (CaptainNEW.teamId && CaptainNEW.teamId !== team.id) {
      throw new AppError(
        "Esse jogador ja esta em um clube diferente do informado"
      );
    }
    const { firstAvailableIndex } = IndexPlayerIndexMaxIndice({ team });

    await prisma.player.update({
      where: { id: CaptainPast.id },
      data: { role: "PLAYER" },
    });

    await prisma.player.update({
      where: { id: CaptainNEW.id },
      data: {
        role: "CAPITAO",
        teamId: team.id,
        positionIndex: firstAvailableIndex,
      },
    });
  }
  if (data.groupId) {
    await PopulateGropScore({ team, groupId: data.groupId });
  }

  const dataUpdate = await prisma.team.update({ where: { id }, data });
  return { dataUpdate };
}
