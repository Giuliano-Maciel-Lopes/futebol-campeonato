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
  updatePlayerByTeamId
} from "@/services/player";
import { uuidSchema } from "@/schemazod/uuid";
import { PlayerBodySchemaupdate } from "@/schemazod/player/update";
import { schemazBOdyIsactiveUpdate } from "@/schemazod/updateISactive";
import { listPlayerParamsSchema } from "@/schemazod/player/list";

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
    const role = req.user?.role // portegido por enseureOptional
    
    const params = listPlayerParamsSchema.parse(req.query)

    const { playersfull } = await listplayer({params ,role});
    res.status(200).json(playersfull);
  }

  async showID(req: Request, res: Response) {
      const role = req.user?.role // protegido por ensuere optional 

    const id = uuidSchema.parse(req.params.id);
    const { playerCardId } = await showPlayerId({id , role});

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
   const {deletedata}= await deletePlayer({ id });
    res.json(deletedata);
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
     console.log(req.cookies); 

    res.status(200).json(playerLog);
  }
  async UpdateByTeamId(req: Request, res: Response) {
   const userId = req.user!.id
    const {  updaedeTeamId } = await updatePlayerByTeamId({ userId });
    res.status(200).json(updaedeTeamId);
  }

}

export { PlayerController };
