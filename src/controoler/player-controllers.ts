import { Request, Response } from "express";
import { PlayerBodySchema } from "@/schemazod/player/create";
import {
  createPlayer,
  showPlayerId,
  listplayer,
  updatePlayer,
  deletePlayer,
  IsactivePlayerUpdate,
  showbyuserIdPlayer,
} from "@/services/player";
import { uuidSchema } from "@/schemazod/uuid";
import { PlayerBodySchemaupdate } from "@/schemazod/player/update";
import { schemazBOdyIsactiveUpdate } from "@/schemazod/updateISactive";
import { SchemaUploadCategory } from "@/schemazod/uploads/uploads";
import { DiskStorageFile } from "@/providers/disktorage";

class PlayerController {
  async create(req: Request, res: Response) {
    const userId = req.user!.id; // protegido na rota

    const data = PlayerBodySchema.parse(req.body);
    const { dataCart } = await createPlayer({
      data,
      userId,
    });

    res.status(200).json(dataCart);
  }
  async list(req: Request, res: Response) {
    const { playersfull } = await listplayer();
    res.status(200).json(playersfull);
  }

  async showID(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);
    const { playerCardId } = await showPlayerId(id);

    res.json(playerCardId);
  }

  async update(req: Request, res: Response) {
    const role = req.user!.role;
    const userId = req.user!.id; // protegido pro middlaware

    const data = PlayerBodySchemaupdate.parse(req.body);
    const id = uuidSchema.parse(req.params.id);
    const { updatedDataIDplayer } = await updatePlayer({
      data,
      id,
      role,
      userId,
    });

    res.status(200).json(updatedDataIDplayer);
  }

  async delete(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);
    await deletePlayer({ id });
    res.json({ message: "Remover jogador (exemplo)" });
  }
  async isActiveUpdate(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);
    const { isActive } = schemazBOdyIsactiveUpdate.parse(req.body);

    const { playerIsActive } = await IsactivePlayerUpdate({ id, isActive });

    res.json(playerIsActive);
  }
  async playersByUser(req: Request, res: Response) {
    const userId = req.user!.id;

    const { playerLog } = await showbyuserIdPlayer({ userId });

    res.status(200).json(playerLog);
  }
}

export { PlayerController };
