
import { z } from "zod";

export const TeamUpdateGrupIdBody = z.object({
  groupId:z.uuid()
});

export type TeamUpdateGrupIdInput = z.infer<typeof TeamUpdateGrupIdBody>;

