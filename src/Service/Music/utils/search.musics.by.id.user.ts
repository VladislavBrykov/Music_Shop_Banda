import { getConnection } from 'typeorm';
import { ErrorsForMusic } from '../../../Constants/errors';
import { Tables } from '../../../Constants/tables';

export async function searchMusicsByIdUser(id_user, root) {
  const musicInBasket: unknown = await getConnection()
    .getRepository(Tables.basket)
    .find({
      where: { id_user, root: root },
    });
  console.log(musicInBasket);

  if (musicInBasket) {
    return musicInBasket;
  } else {
    throw new Error(ErrorsForMusic.MusicNotExists);
  }
}
