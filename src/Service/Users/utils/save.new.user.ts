import { getConnection } from 'typeorm';
import User from '../../../entity/User';
import newTokenCreator from './create.new.token';
import { RolesUser } from '../../../Constants/roles';
import { Tables } from '../../../Constants/tables';
import { hashPassword } from '../../../Helpers/hash.password';

export async function saveNewUser(login, password) {
  const newToken = newTokenCreator(login);
  password = hashPassword(password);
  const users = new User();
  users.phoneEmail = login;
  users.password = password;
  users.token = await newToken;
  users.role = RolesUser.admin;
  users.createdAt = new Date();
  users.updatedAt = new Date();
  await getConnection().getRepository(Tables.user).save(users);
  return users;
}
