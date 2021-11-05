import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';

async function searchUserByToken(token: string) {
  const searchUser = (await getConnection().getRepository(Tables.user).findOne({
    where: { token },
  })) as unknown as {
    id: number;
    userPhoneEmail: string;
    token: string;
    createAt: Date;
    updatedAt: Date;
  };

  if (searchUser) {
    const username: string = searchUser.userPhoneEmail;
    return username;
  }
  return false;
}
export default searchUserByToken;
