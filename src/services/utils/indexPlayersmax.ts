import { AppError } from "@/utils/AppEroor";
import { Team, Player } from "@prisma/client";


type TeamWithPlayers = Team & { players: Player[] };

type Props = {
  team: TeamWithPlayers;
};

export function IndexPlayerIndexMaxIndice({team}:Props){
     if (team.players.length >= 14) {
      throw new AppError("tima ja atingiu o limite de jogadores", 400);
    }
    // pwguwi todos os índices já usados no time
    const usedIndexes = team.players
      .map((p) => p.positionIndex)
      .filter((i): i is number => i !== null);

    // array de 0 a 13 
    const possibleIndexes = Array.from({ length: 14 }, (_, i) => i);

    // Encontrar o primeiro índice disponível
    const firstAvailableIndex = possibleIndexes.find(
      (index) => !usedIndexes.includes(index)
    );
    return {firstAvailableIndex}
}