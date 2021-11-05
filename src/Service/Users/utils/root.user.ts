import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';

async function userRootByUsername(phoneEmail: string) {
  const searchUser = (await getConnection().getRepository(Tables.user).findOne({
    where: { phoneEmail },
  })) as unknown as {
    id: number;
    phoneEmail: string;
    password: string;
    role: string;
  };

  if (searchUser) {
    return searchUser.role;
  }
  return false;
}
export default userRootByUsername;
