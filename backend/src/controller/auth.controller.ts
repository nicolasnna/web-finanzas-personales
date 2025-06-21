import { refreshTokenService, registerUserWithEmailService, signupUserWithEmailService } from "@/services/auth.service";
import { Request, Response } from "express";

interface RegisterUserRequest {
  email: string;
  password: string;
}

/**
 * Controlador para crear usuarios por email y password
 */
export const registerUserWithEmailController = async (
  req: Request<{}, {}, RegisterUserRequest>,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos." });
  }

  try {
    const user = await registerUserWithEmailService(email, password);
    res.status(201).json({ message: "Usuario creado con exito. ", user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para iniciar sesion
 */
export const signupUserWithEmailController = async ( req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y constraseña son requeridos." });
  }

  try {
    const {token, refreshToken} = await signupUserWithEmailService(email, password)
    res.cookie("refreshToken", refreshToken, {sameSite: "lax"})
    res.status(200).json({ message: "Usuario iniciado con exito.", token, refreshToken})
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}

export const refreshTokenController = async ( req: Request, res: Response): Promise<any> => {
  const refreshToken = req.cookies.refreshToken
  const tokenOld = req.body.token
  if (!refreshToken || !tokenOld) {
    return res
      .status(400)
      .json({ message: "Refresh token y token son requeridos." });
  } 

  try {
    const token = refreshTokenService(tokenOld, refreshToken)
    res.status(200).json({ message: "Token actualizado con exito.", token })
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}