import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';
import User from '../../../entity/User';

async function updateRefresh(phoneEmail, newToken) {
  const searchUser = await getConnection()
    .getRepository<User>(Tables.user)
    .findOne({
      where: { phoneEmail },
    });

  if (searchUser) {
    searchUser.token = newToken;
    await getConnection().getRepository<User>(Tables.user).save(searchUser);
  }
}

export default updateRefresh;
