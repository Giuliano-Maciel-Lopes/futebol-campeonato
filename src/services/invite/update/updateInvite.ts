import { InviteUpdate } from "@/schemazod/invite/update";

interface IUpdateInviteRequest {
  id: string;
  data: InviteUpdate;
}


export async function updateInvite({ id, data }: IUpdateInviteRequest) {
  // Lógica será adicionada depois por você
  return { invite: {} };
}
