import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';

export async function searchUserByLogin(phoneEmail, password?) {
  let searchUser: any = new Object();
  if (password) {
    searchUser = await getConnection().getRepository(Tables.user).findOne({
      where: { phoneEmail, password },
    });
  } else {
    searchUser = await getConnection().getRepository(Tables.user).findOne({
      where: { phoneEmail },
    });
  }
  return searchUser;
}
