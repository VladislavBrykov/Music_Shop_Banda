import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';
import User from '../../../entity/User';

export async function getUser(phoneEmail: string) {
  return await getConnection().getRepository<User>(Tables.user).findOne({
    where: { phoneEmail },
  });
}
