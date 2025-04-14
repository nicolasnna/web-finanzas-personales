import { refreshTokenController, registerUserWithEmailController, signupUserWithEmailController } from "@/controller/auth.controller";
import { Router } from "express";

const authRouter = Router()

/**
 * Endpoint para registrar usuario con email
 */
authRouter.post("/register-email", registerUserWithEmailController)
authRouter.post("/signup-email", signupUserWithEmailController)
authRouter.post("/refresh-token", refreshTokenController)




export default authRouter