import { Request, Response } from "express";
import { PlayerBodySchema } from "@/schemazod/player/create";
import { createPlayer } from "@/services/player";

class PlayerController {
  async create(req: Request, res: Response) {
    const userId = req.user!.id; // protegido no index routes

    const data = PlayerBodySchema.parse(req.body);
    const { dataCart } = await createPlayer({ data, userId });

    res.json(dataCart);
  }

  async get(req: Request, res: Response) {
    res.json({ message: "Buscar jogador (exemplo)" });
  }

  async list(req: Request, res: Response) {
    res.json({ message: "Listar jogadores (exemplo)" });
  }

  async update(req: Request, res: Response) {
    res.json({ message: "Atualizar jogador (exemplo)" });
  }

  async delete(req: Request, res: Response) {
    res.json({ message: "Remover jogador (exemplo)" });
  }
}

export { PlayerController };
