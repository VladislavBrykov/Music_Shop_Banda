import { getConnection } from 'typeorm';
import { ErrorsForUser } from '../../../Constants/errors';
import { Tables } from '../../../Constants/tables';

export async function searchUserByLogin(login: string) {
  const searchUser: unknown = await getConnection()
    .getRepository(Tables.user)
    .find({
      where: { phoneEmail: login },
    });
  if (searchUser) {
    return searchUser;
  } else {
    throw new Error(ErrorsForUser.SearchUser);
  }
}
