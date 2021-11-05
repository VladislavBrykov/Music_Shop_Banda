import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';

async function updateRefresh(phoneEmail, newToken) {
  const searchUser = (await getConnection().getRepository(Tables.user).findOne({
    where: { phoneEmail },
  })) as unknown as { token: string };

  if (searchUser) {
    searchUser.token = newToken;
    await getConnection().getRepository('user').save(searchUser);
  }
}

export default updateRefresh;
