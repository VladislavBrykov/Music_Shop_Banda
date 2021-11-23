import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';
import Basket from '../../../entity/Basket';

export async function rootForMuz(searchMusicUser) {
  let numberSound = 0;
  while (searchMusicUser[numberSound]) {
    searchMusicUser[numberSound].root = true;
    numberSound++;
  }
  await getConnection()
    .getRepository<Basket>(Tables.basket)
    .save(searchMusicUser);
}
