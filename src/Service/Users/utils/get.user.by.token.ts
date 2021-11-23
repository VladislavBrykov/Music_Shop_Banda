import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';
import User from '../../../entity/User';

async function getUserByToken(token: string) {
  const searchUser = await getConnection()
    .getRepository<User>(Tables.user)
    .findOne({
      where: { token },
    });

  if (searchUser) {
    return searchUser;
  }
  return false;
}
export default getUserByToken;
