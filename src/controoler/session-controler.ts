import { sessionCreate } from "@/services/session";
import { Request, Response } from "express";
import { createSessionSchema } from "@/schemazod/session/creat";

class SessionController {
  async create(req: Request, res: Response) {
    const data = createSessionSchema.parse(req.body);
    const { token, datauser } = await sessionCreate({ data });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // só HTTPS em produção
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
      path: "/",
      ...(process.env.NODE_ENV === "production" && { domain: ".meusite.com" }), // só em produção
    });

    res.json({ datauser });
  }
  async destroy(req: Request, res: Response) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0), // expira imediatamente
      path: "/",
      ...(process.env.NODE_ENV === "production" && { domain: ".meusite.com" }),
    });

    // Você pode também invalidar sessão no banco se precisar
    // await sessionInvalidate(req.userId);

    res.status(200).json({ message: "Logout realizado com sucesso" });
  }
}

export { SessionController };
