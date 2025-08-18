import { Request, Response } from "express";
import { createTeam, listTeam ,deleteTeam , showTeamId , updateTeam} from "@/services/team";
import { TeamBodySchema } from "@/schemazod/team/create";
import { uuidSchema } from "@/schemazod/uuid";

class TeamController {
  async create(req: Request, res: Response) {
    const role = req.user!.role;
    const userId = req.user!.id;

    const data = TeamBodySchema.parse(req.body);
    const { TeamCreate } = await createTeam({
      data,
      rolePlayer: "CAPITAO",
      role,
      userId,
    });

    res.json(TeamCreate);
  }

  async list(req: Request, res: Response) {
    const { fullTeam } = await listTeam();
    res.json(fullTeam);
  }
  async showID(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id)
  const {teamId}=  await showTeamId(id)
  res.json(teamId)
  }

  async update(req: Request, res: Response) {
    res.json();
  }
  async delete(req: Request, res: Response) {
    res.json({});
  }
}

export { TeamController };
