import { AppError } from "@/utils/AppEroor"
import { Player, Role, Team } from "@prisma/client"
import { TeamUpdateInput } from "@/schemazod/team/update";
import { findPlayerByUserId } from "@/utils/prismaHelpersutils";



type  Props = {
userId:string
role: Role
team:Team
data: TeamUpdateInput;
}

export async function  CheckPermission({userId ,  role ,team ,data}:Props){

    if (role !== "ADMIN") {
        const { player } = await findPlayerByUserId(userId);

    if (team.captainId !== player.id) {
      throw new AppError(
        "Você não tem autorização para atualizar este time",
        403
      );
    }
    if (data.captainId ||data.captainId ) {
      throw new AppError(
        "Somente Administradores pode mudar o capitao e o grupo de um time entre contato com a equipe ",
        403
      );
    }
  }
    
}