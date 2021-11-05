import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';

export async function updateMusicRootTrue(searchMusicUser) {
  let i = 0;
  while (searchMusicUser[i]) {
    searchMusicUser[i].root = true;
    i++;
  }
  await getConnection().getRepository(Tables.basket).save(searchMusicUser);
}
