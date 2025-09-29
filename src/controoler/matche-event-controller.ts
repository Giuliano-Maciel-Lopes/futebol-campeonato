import { Request, Response } from "express";
import { uuidSchema } from "@/schemazod/uuid";
import { MatcheEventBodySchema } from "@/schemazod/matche-event/create";
import { createMatcheEvent, deleteMatchEvent } from "@/services/matche-event";

class MatcheEventController {
  async create(req: Request, res: Response) {
    const data = MatcheEventBodySchema.parse(req.body);

    const { eventmatch } = await createMatcheEvent({ data });

    res.status(200).json(eventmatch);
  }
  async delete(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);

    const { deleteEevnt } = await deleteMatchEvent(id);

    res.status(200).json(deleteEevnt);
  }

  async list(req: Request, res: Response) {
    res.status(200).json();
  }

  async showID(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);

    res.json();
  }
}

export { MatcheEventController };
