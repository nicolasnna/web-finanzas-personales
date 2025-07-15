import {
  loginUserWithEmailService,
  refreshTokenService,
  registerUserWithEmailService,
} from "../services/auth.service";
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
    res
      .status(201)
      .json({ message: "Usuario creado con exito. ", email: user.email });
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      return res.status(409).json({ message: "El email ya está en uso." });
    }
    if (error.code === "auth/invalid-email") {
      return res
        .status(422)
        .json({ message: "El formato del correo no es válido." });
    }
    if (error.code === "auth/weak-password") {
      return res
        .status(422)
        .json({ message: "La contraseña es demasiado débil." });
    }
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para iniciar sesion
 */
export const loginUserWithEmailController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos." });
  }

  try {
    const { token, refreshToken } = await loginUserWithEmailService(
      email,
      password
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
    });
    res
      .status(200)
      .json({ message: "Usuario iniciado con exito.", token });
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    if (error.code === "auth/invalid-credential") {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }
    return res.status(500).json({ message: "Error interno" });
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response
): Promise<any> => {
  const refreshToken = req.cookies.refreshToken;
  const tokenOld = req.body.token;
  if (!refreshToken || !tokenOld) {
    return res
      .status(400)
      .json({ message: "Refresh token y token son requeridos." });
  }

  try {
    const token = refreshTokenService(tokenOld, refreshToken);
    res.status(200).json({ message: "Token actualizado con exito.", token });
  } catch (error: any) {
    const status = error.code && typeof error.code === "number" ? error.code : 500;
    const message = error.message || "Error interno del servidor.";
    return res.status(status).json({ message });
  }
};
