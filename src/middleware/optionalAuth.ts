import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth.js";
import { Role } from "@prisma/client";

interface TokenPayload {
  role: Role;
  sub: string;
}

function optionalAuth(req: Request, res: Response, next: NextFunction) {
  if (req.path.startsWith("/TPM")) return next();

  const token = req.cookies?.token;
  if (!token) {
    // não tem token → continua sem user
    return next();
  }

  try {
    const { role, sub: user_id } = jwt.verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    req.user = {
      id: user_id,
      role,
    };

    console.log("Role do usuário em optionalAuth:", req.user.role);
  } catch (error) {
    // se token inválido → ignora (não bloqueia)
    console.log("Token inválido ignorado em optionalAuth");
  }

  return next();
}

export { optionalAuth };
