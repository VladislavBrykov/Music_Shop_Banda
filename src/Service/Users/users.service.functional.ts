import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import { checkingUserExistence } from './utils/checking.user.existence';
import { saveNewUser } from './utils/save.new.user';
import { searchUserByLogin } from './utils/search.user.by.login';
import { saveTokensAfterLogin } from './utils/save.tokens.after.login';
import searchUserByToken from './utils/search.user.by.token';
import newTokenCreator from './utils/create.new.token';
import { ErrorsForUser } from '../../Constants/errors';
import { decryptionPassword, hashPassword } from '../../Helpers/hash.password';

@injectable()
class UserService {
  constructor() {}

  async getUsers() {
    const users = await getConnection().getRepository('user').find();
    return users;
  }

  async registration(login, password) {
    if (await checkingUserExistence(login))
      throw new Error(ErrorsForUser.UserExists);
    return await saveNewUser(login, password);
  }

  async login(phoneEmail, password) {
    const searchUser = await searchUserByLogin(phoneEmail, password);
    if (!searchUser && !decryptionPassword(password, searchUser.password))
      return { status: false };
    else {
      const tokens = await saveTokensAfterLogin(searchUser, phoneEmail);
      return { status: true, tokens, searchUser };
    }
  }

  async refreshToken(refreshToken) {
    const searchUser = (await searchUserByToken(refreshToken)) as unknown as {
      phoneEmail: string;
    };
    if (searchUser) {
      const newJwtToken = newTokenCreator(searchUser.phoneEmail);
      return newJwtToken;
    }
    return false;
  }
}

export default UserService;
