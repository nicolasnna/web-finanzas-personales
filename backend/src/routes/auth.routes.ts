import { loginUserWithEmailController, refreshTokenController, registerUserWithEmailController } from "@/controller/auth.controller";
import { Router } from "express";

const authRouter = Router()

/**
 * Endpoint para registrar usuario con email
 */
authRouter.post("/register", registerUserWithEmailController)
authRouter.post("/login", loginUserWithEmailController)
authRouter.post("/refresh-token", refreshTokenController)




export default authRouter