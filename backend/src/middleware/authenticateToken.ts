import { verifyToken } from "../services/auth.service"
import { RequestUser } from "../types/RequestUser.interface";
import { Response, NextFunction } from "express";

/**
 * Middleware para la autenticación
 */
export const authenticateToken = (req: RequestUser, res: Response, next: NextFunction) : void | any => {
  const token = req.headers["authorization"]?.split(" ")[1]
  
  if (!token) {
    return res.status(401).json({message: "Se necesita un token para la validación"})
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    return res.status(401).json({message: "Token inválido" });
  }

  req.user = decoded as Object

  next()
}