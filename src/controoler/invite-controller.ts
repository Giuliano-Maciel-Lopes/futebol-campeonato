import { Request, Response } from "express";
import {
  createInvite,
  deleteInvite,
  listInvite,
  showInvite,
  updateInvite,
} from "@/services/invite";
import { InviteBodySchema } from "@/schemazod/invite/create";
import { InviteUpdateSchema } from "@/schemazod/invite/update";
import { uuidSchema } from "@/schemazod/uuid"; 

class InviteController {
  async create(req: Request, res: Response) {
    const userId = req.user!.id; 
    const data = InviteBodySchema.parse(req.body)

    const {invitecreate} = await createInvite({data ,userId})
  
    res.status(200).json( invitecreate );
  }

  async list(req: Request, res: Response) {
    // const { invites } = await listInvite();
    res.status(200).json({});
  }

  async showID(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);
    // const { invite } = await showInvite({ id });
    res.status(200).json({});
  }

  async update(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);
    const data = InviteUpdateSchema.parse(req.body);
    // const { invite } = await updateInvite({ id, data });
    res.json({});
  }

  async delete(req: Request, res: Response) {
    const id = uuidSchema.parse(req.params.id);
    // const { invite } = await deleteInvite({ id });
    res.status(200).json({});
  }
}

export { InviteController };
