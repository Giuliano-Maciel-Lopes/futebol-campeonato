import { Request, Response } from "express";
import { createTeam } from "@/services/team";
import { TeamBodySchema } from "@/schemazod/team/create";

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
    res.status(200).json({});
  }
  async showID(req: Request, res: Response) {
    res.json({});
  }
  async update(req: Request, res: Response) {
    res.json({});
  }
  async delete(req: Request, res: Response) {
    res.json({});
  }
}

export { TeamController };
