import {getConnection} from 'typeorm';
import {Tables} from '../../../Constants/tables';

export async function searchUserByLogin(phoneEmail) {
  return await getConnection().getRepository(Tables.user).findOne({
    where: {phoneEmail},
  });
}
