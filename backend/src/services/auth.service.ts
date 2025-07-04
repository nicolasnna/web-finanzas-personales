import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from '@/firebase/firebase';
import { sign, verify } from "jsonwebtoken"
import { infoTokenProps, uidTokenProps } from "@/types/GenerateToken.interface";
import { User } from "@/types/User.interface";

const JWT_SECRET = process.env.JWT_SECRET || "FINANZA_PERSONAL"
const JWT_EXPIRATION = process.env.JWT_EXPIRE || "10m"

/**
 * Genera un token JWT con la información del usuario
 * @param {Object} info - Información del usuario uid y tiempo de conexion }
 * @returns {string} Token JWT
 */
const generateToken = (info: infoTokenProps): string => {
  return sign(info, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}


/**
 * Genera un token de actualización para el usuario
 * @param {object} user - Información del usuario uid y tiempo de conexion
 * @returns {string} Token de actualización
 */
const generateRefreshToken = (user: uidTokenProps): string => {
  return sign(user, JWT_SECRET)
}


/**
 * Verifica y decodifica un token JWT
 * @param {string} token - Token JWT
 * @returns {Object| string | null} Payload decodificado o null si no es válido
 */
export const verifyToken = (token: string): User | null => {
  try {
    const decoded = verify(token, JWT_SECRET);
    if (typeof decoded === "string") {
      return null;
    }

    return decoded;
  } catch (error: any) {
    //console.error("Token inválido:", error.message);
    return null;
  }
}

export const decodeIgnoringExpiration = (token: string) => {
  try {
    // true: no falla aunque el token haya caducado
    return verify(token, JWT_SECRET, { ignoreExpiration: true });
  } catch {
    return null;
  }
}

export const refreshTokenService = (token: string, refreshToken: string) => {
  const decoded = decodeIgnoringExpiration(token)
  
  if (!decoded) {
    throw new Error("Token inválido")
  }

  const { uid, email } = decoded as { uid: string, email: string }
  

  const refreshDecoded = verifyToken(refreshToken)

  if (!refreshDecoded) {
    throw { code: 401, message: "Token de actualización inválido"}
  }
  if (refreshDecoded.uid !== uid) {
    throw { code: 401, message: "Token de actualización no coincide con el usuario"}
  }

  const newToken = generateToken({ uid: uid, email: email })
  return newToken
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
    throw {code: error, message: mapFirebaseAuthError(error.code)};
  }
};

/**
 * Inicia sesión con email y contraseña
 * @param email - Correo electrónico registrado
 * @param password - Contraseña asociada
 * @returns Informacion del usuario iniciado uid, email, token
 */
export const loginUserWithEmailService = async (
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
    const refreshToken = generateRefreshToken({uid: userCredentials.user.uid})

    return {
      token,
      refreshToken
    };
  } catch (error: any) {
    throw {code: error.code, message: mapFirebaseAuthError(error.code)};
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
