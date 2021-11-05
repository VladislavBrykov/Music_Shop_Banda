import { searchUserByLogin } from '../utils/search.user.by.login';

export async function checkingUserExistence(login) {
  const searchUser: unknown = searchUserByLogin(login);
  if (searchUser) return true;
  else return false;
}
