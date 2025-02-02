import { Request } from "express";
import { User } from "./user.interface";

export interface RequestUser extends Request {
  user?: User
}