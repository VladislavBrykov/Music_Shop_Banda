import { getConnection } from 'typeorm';
import { ErrorsForUser } from '../../../Constants/errors';
import { Tables } from '../../../Constants/tables';
import User from '../../../entity/User';

export async function searchUserByLogin(login: string) {
  const searchUser: User[] = await getConnection()
    .getRepository<User>(Tables.user)
    .find({
      where: { phoneEmail: login },
    });
  if (searchUser) {
    return searchUser;
  } else {
    throw new Error(ErrorsForUser.SearchUser);
  }
}
