import { User } from '../api/index';
import { AppDataSource } from '../../config/data-source';

export const getUser = async (email: string): Promise<User> => {
  return await AppDataSource.manager.findOneByOrFail(User, {
    email: email
  });
};

export const emailAlreadyExists = async (email: string): Promise<boolean> => {
  return await AppDataSource.manager.exists(User, { where: { email: email } });
};

export const getUserById = async (id: string): Promise<User> => {
  return await AppDataSource.manager.findOneByOrFail(User, {
    id: id
  });
};
