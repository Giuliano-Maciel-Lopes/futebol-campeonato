import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth.js";
import { AppError } from "@/utils/AppEroor";
import { Role } from "@prisma/client";

interface TokenPayload {
  role: Role;
  sub: string;
}

function ensureAuth(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith("/TPM")) return next();
    
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError("TOKEN não encontrado", 401);
    }

    const { role, sub: user_id } = jwt.verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    req.user = {
      id: user_id,
      role,
    };

    console.log("Role do usuário em ensureAuth:", req.user.role);
    next();
  } catch (error) {
    throw new AppError("Sessão expirada ou inválida. Faça login para continuar.", 401);
  }
}

export { ensureAuth };
