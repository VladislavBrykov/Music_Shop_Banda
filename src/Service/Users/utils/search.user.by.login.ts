import {getConnection} from 'typeorm';
import {Tables} from '../../../Constants/tables';

export async function searchUserByLogin(phoneEmail) {
  return await getConnection().getRepository(Tables.user).findOne({
    where: {phoneEmail},
  })as unknown as {
    id: number;
    phoneEmail: string;
    password: string;
    role: string;
  }
}
