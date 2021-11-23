import { getUser } from './get.user';
import User from '../../../entity/User';

export async function userExistence(login) {
  const searchUser: Promise<User> = getUser(login);
  return !!searchUser;
}
