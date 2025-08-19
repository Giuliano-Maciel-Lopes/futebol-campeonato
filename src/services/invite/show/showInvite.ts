interface IShowInviteRequest {
  id: string;
}

interface IShowInviteResponse {
  invite: any;
}

export async function showInvite({ id }: IShowInviteRequest) {
  // Lógica será adicionada depois por você
  return { invite: {} };
}
