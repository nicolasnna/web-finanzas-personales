import { Request } from "express";
import { User } from "./User.interface";

export interface RequestUser extends Request {
  user?: User
}