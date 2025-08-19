interface IDeleteInviteRequest {
  id: string;
}

interface IDeleteInviteResponse {
  invite: any;
}

export async function deleteInvite({ id }: IDeleteInviteRequest) {
  // Lógica será adicionada depois por você
  return { invite: {} };
}
