import {
  createUserWithEmailAndPassword,
  getIdToken,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { sign, verify } from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "FINANZA_PERSONAL"
const JWT_EXPIRATION = "30m"

/**
 * Genera un token JWT con la información del usuario
 * @param {Object} info - Información del usuario uid y tiempo de conexion }
 * @returns {string} Token JWT
 */
const generateToken = (info: object): string => {
  return sign(info, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

/**
 * Verifica y decodifica un token JWT
 * @param {string} token - Token JWT
 * @returns {Object|null} Payload decodificado o null si no es válido
 */
export const verifyToken = (token: string): object | null => {
  try {
    const decoded = verify(token, JWT_SECRET);
    if (typeof decoded === 'string') {
      return null;
    }
    return decoded;
  } catch (error: any) {
    console.error("Token inválido:", error.message);
    return null;
  }
}


/**
 * Crea usuario con email y contraseña en Firebase Auth
 * @param email - Correo electrónico del usuario
 * @param password - Contraseña del usuario
 * @returns Información del usuario registrado
 */
export const registerUserWithEmailService = async (
  email: string,
  password: string,
) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return {
      uid: userCredentials.user.uid,
      email: userCredentials.user.email,
    };
  } catch (error: any) {
    throw new Error(mapFirebaseAuthError(error));
  }
};

/**
 * Inicia sesión con email y contraseña
 * @param email - Correo electrónico registrado
 * @param password - Contraseña asociada
 * @returns Informacion del usuario iniciado uid, email, token
 */
export const signupUserWithEmailService = async (
  email: string,
  password: string
) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = generateToken({ uid: userCredentials.user.uid, email: userCredentials.user.email})
    // console.log(token)
    return {
      token
    };
  } catch (error: any) {
    throw new Error(mapFirebaseAuthError(error));
  }
};

/**
 * Traduce los errores obtenidos por el auth en firebase
 * @param errorCode - Error entregado por firebase auth
 * @returns Mensaje legible
 */
const mapFirebaseAuthError = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "El correo ya está en uso.";
    case "auth/invalid-email":
      return "El formato del correo no es válido.";
    case "auth/weak-password":
      return "La contraseña es demasiado débil.";
    default:
      return "Error al crear el usuario. codigo: ".concat(errorCode);
  }
};
