import { Request, Response } from "express";
import { uuidSchema } from "@/schemazod/uuid";
import { MatchBodySchema } from "@/schemazod/match/create";
import { MatchBodySchemaupdateStatus } from "@/schemazod/match/updatStatus";
import { ParamsSchemaMatch } from "@/schemazod/match/params";
import {
  createMatch,
  showMatchId,
  listMatch,
  deleteMatch,
  updateStatus,
} from "@/services/match";

class MatchController {
  async create(req: Request, res: Response) {
    const data = MatchBodySchema.parse(req.body);

    const { dataMatch } = await createMatch({ data });

    res.status(200).json(dataMatch);
  }

  async list(req: Request, res: Response) {

    const params = ParamsSchemaMatch.parse(req.query)
    
    const { dataMatch } = await listMatch({params});
    res.json(dataMatch);
  }

  async showID(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);

    const { MatchId } = await showMatchId(id);

    res.json(MatchId);
  }

  async delete(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);
    const { dataDelete } = await deleteMatch(id);
    res.json(dataDelete);
  }
  async updateStatus(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);
    const data = MatchBodySchemaupdateStatus.parse(req.body);

    const { statusmatch } = await updateStatus({ data, id });
    res.json(statusmatch);
  }

  // futuramente c o projeto crescer e criar + campeonatos coloco isActive COM PATCH
  // para ficar aparecendo ou n mas por enquanto nao precisa
}

export { MatchController };
