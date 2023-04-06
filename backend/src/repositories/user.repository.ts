import { User } from "../models/user.js";
import { AppDataSource } from "../config/data-source.js";

export const getUser = async (email: string): Promise<User> => {
    return await AppDataSource.manager.findOneByOrFail(User, {
      email: email,
    })
}

export const getUserById = async (id: number): Promise<User> => {
  return await AppDataSource.manager.findOneByOrFail(User, {
    id: id,
  })
}
