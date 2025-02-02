import { registerUserWithEmailService, signupUserWithEmailService } from "@/services/auth.service";
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
      .json({ message: "Email y constraseña son requeridos." });
  }

  try {
    const user = await registerUserWithEmailService(email, password);
    res.status(201).json({ message: "Usuario creado con exito. ", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
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
    const user = await signupUserWithEmailService(email, password)
    res.status(200).json({ message: "Usuario iniciado con exito.", ...user})
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
}
