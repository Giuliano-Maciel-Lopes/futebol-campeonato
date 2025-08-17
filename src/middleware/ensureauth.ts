import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "@/config/auth.js";
import { AppError } from "@/utils/AppEroor";

interface TokenPayload {
  role: Role;
  sub: string;
}

function ensureAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError("TOKEN nao encontrado", 401);
    }

    const [, token] = authorization.split(" ");

    const { role, sub: user_id } = jwt.verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    req.user = {
      id: user_id,
      role,
    };

    next();
  } catch (error) {
    throw new AppError("TOKEN INVÁLIDO!!", 401);
  }
}

export { ensureAuth };
