import { Request, Response } from "express";
import {
  createTeam,
  listTeam,
  deleteTeam,
  showTeamId,
  updateTeam,
  IsactiveTeamUpdate,
  UpdatePositionIndexTeam,
  showTeamUserID,
} from "@/services/team";
import { TeamBodySchema } from "@/schemazod/team/create";
import { uuidSchema } from "@/schemazod/uuid";
import { TeamUpdateSchema } from "@/schemazod/team/update";
import { schemazBOdyIsactiveUpdate } from "@/schemazod/updateISactive";
import { TeamFormationSchema } from "@/schemazod/team/updatePositionindex";

class TeamController {
  async create(req: Request, res: Response) {
    const data = TeamBodySchema.parse(req.body);
    const { TeamCreate } = await createTeam({
      data,
    });

    res.status(200).json(TeamCreate);
  }

  async list(req: Request, res: Response) {
    const role = req.user?.role;

    const { fullTeam } = await listTeam({ role });
    res.status(200).json(fullTeam);
  }
  async showID(req: Request, res: Response) {
    const role = req.user?.role;
    const id = uuidSchema.parse(req.params.id);
    const { teamId } = await showTeamId({ id, role });
    res.status(200).json(teamId);
  }
  async showTeamUserID(req: Request, res: Response) {
    const userId = req.user!.id; // protegido por middlaware
    const TeamUser = await showTeamUserID({ userId });

    res.status(200).json(TeamUser);
  }

  async update(req: Request, res: Response) {
    const role = req.user!.role; // protegido pro midllaware
    const userId = req.user!.id; // protegido pro midllaware

    const id = uuidSchema.parse(req.params.id);
    const data = TeamUpdateSchema.parse(req.body);

    const { dataUpdate } = await updateTeam({ data, id, role, userId });

    res.json(dataUpdate);
  }
  async delete(req: Request, res: Response) {
    const role = req.user!.role; // protegido pro midllaware
    const id = uuidSchema.parse(req.params.id);

    const { teamDelete } = await deleteTeam({ id });

    res.status(200).json(teamDelete);
  }
  async isActiveUpdate(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);
    const { isActive } = schemazBOdyIsactiveUpdate.parse(req.body);

    const { teamIsActive } = await IsactiveTeamUpdate({ id, isActive });

    res.status(200).json(teamIsActive);
  }
  async PositionIndexeUpdate(req: Request, res: Response) {
    const userId = req.user!.id; // PROTEGIDO POR Middlaware
    const id = uuidSchema.parse(req.params.id);
    const data = TeamFormationSchema.parse(req.body);

    await UpdatePositionIndexTeam({ id, userId, data });

    res.status(200).json("Alteraçoes feitas com sucesso");
  }
}

export { TeamController };
