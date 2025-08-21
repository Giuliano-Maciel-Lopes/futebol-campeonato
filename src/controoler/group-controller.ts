import { querySchemaList } from "@/schemazod/group/tablelist";
import { listGroups } from "@/services/group";
import { Request, Response } from "express";

export class GroupController {
  async listTable(req: Request, res: Response) {
    const name = querySchemaList.parse(req.query);

    const { groups } = await listGroups(name);

    return res.status(200).json(groups);
  }
}
