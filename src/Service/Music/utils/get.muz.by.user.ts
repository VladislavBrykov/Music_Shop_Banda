import { getConnection } from 'typeorm';
import { ErrorsForMusic } from '../../../Constants/errors';
import { Tables } from '../../../Constants/tables';
import Basket from '../../../entity/Basket';

export async function searchMusicUserByUserID(id_user) {
  const searchMusicUser: Basket[] = await getConnection()
    .getRepository<Basket>(Tables.basket)
    .find({
      where: { id_user },
    });
  if (searchMusicUser) {
    return searchMusicUser;
  } else {
    throw new Error(ErrorsForMusic.MusicNotExists);
  }
}
