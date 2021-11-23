import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';
import User from '../../../entity/User';

async function userRootByUsername(phoneEmail: string) {
  const searchUser = await getConnection()
    .getRepository<User>(Tables.user)
    .findOne({
      where: { phoneEmail },
    });

  if (searchUser) {
    return searchUser.role;
  }
  return false;
}
export default userRootByUsername;
