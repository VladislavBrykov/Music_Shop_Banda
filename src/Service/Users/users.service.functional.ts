import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import { createUser } from './utils/create.user';
import { getUser } from './utils/get.user';
import { saveTokens } from './utils/save.tokens';
import getUserByToken from './utils/get.user.by.token';
import newTokenCreator from './utils/create.token';
import { decryptionPassword, hashPassword } from '../../Helpers/hash.password';
import User from '../../entity/User';
import { Authorized, Login, Token } from '../../interfaces';

@injectable()
class UserService {
  constructor() {}

  async getUsers() {
    return await getConnection().getRepository<User>('user').find();
  }

  async registration(email, password): Promise<boolean> {
    const searchUser: User = await getUser(email);
    if (searchUser) return false;
    await createUser(email, hashPassword(password));
    return true;
  }

  async login(phoneEmail, password): Promise<Authorized | Login> {
    const searchUser: User = await getUser(phoneEmail);
    if (!searchUser && !decryptionPassword(password, searchUser.password))
      return { status: false };
    else {
      const tokens: object = await saveTokens(searchUser, phoneEmail);
      return { status: true, tokens, searchUser };
    }
  }

  async refreshToken(refreshToken): Promise<boolean | Token> {
    const searchUser: User | boolean = await getUserByToken(refreshToken);
    if (searchUser) {
      return newTokenCreator(searchUser.phoneEmail);
    }
    return false;
  }
}

export default UserService;
