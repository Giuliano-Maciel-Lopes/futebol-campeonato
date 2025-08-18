import { Request, Response } from "express";
import { PlayerBodySchema } from "@/schemazod/player/create";
import { createPlayer, showPlayerId ,listplayer } from "@/services/player";
import { uuidSchema } from "@/schemazod/uuid";


class PlayerController {
  async create(req: Request, res: Response) {
    const userId = req.user!.id; // protegido na rota 

    const data = PlayerBodySchema.parse(req.body);
    const { dataCart } = await createPlayer({ data, userId });

    res.status(200).json(dataCart);
  }
    async list(req: Request, res: Response) {
   const {playersfull} =  await listplayer()
   res.status(200).json(playersfull)
  }

  async showID(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);
    const {playerCardId } = await showPlayerId(id);

    res.json( playerCardId );
  }
  
  async update(req: Request, res: Response) {
   
  }

  async delete(req: Request, res: Response) {
    res.json({ message: "Remover jogador (exemplo)" });
  }
}

export { PlayerController };
