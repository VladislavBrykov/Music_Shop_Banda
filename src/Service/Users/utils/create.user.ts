import { getConnection } from 'typeorm';
import User from '../../../entity/User';
import newTokenCreator from './create.token';
import { RolesUser } from '../../../Constants/roles';
import { Tables } from '../../../Constants/tables';
import { hashPassword } from '../../../Helpers/hash.password';
import { Token } from '../../../interfaces';

export async function createUser(login: string, password: string) {
  const newToken: Token = await newTokenCreator(login);
  password = hashPassword(password);
  const users: User = new User();
  users.phoneEmail = login;
  users.password = password;
  users.token = newToken;
  users.role = RolesUser.admin;
  users.createdAt = new Date();
  users.updatedAt = new Date();
  await getConnection().getRepository<User>(Tables.user).save(users);
  return users;
}
