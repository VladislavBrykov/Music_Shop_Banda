import { getConnection } from 'typeorm';
import { ErrorsForMusic } from '../../../Constants/errors';
import { Tables } from '../../../Constants/tables';

export async function searchMusicUserByUserID(id_user) {
  const searchMusicUser: unknown = await getConnection()
    .getRepository(Tables.basket)
    .find({
      where: { id_user },
    });
  if (searchMusicUser) {
    return searchMusicUser;
  } else {
    throw new Error(ErrorsForMusic.MusicNotExists);
  }
}
