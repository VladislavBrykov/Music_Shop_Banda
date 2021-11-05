import { getConnection } from 'typeorm';
import Basket from '../../../entity/Basket';
import { Tables } from '../../../Constants/tables';

export default async function newMusicInBasket(id_sound, id_user) {
  const basket = new Basket();
  basket.id_sound = id_sound;
  basket.id_user = id_user;
  basket.root = false;
  await getConnection().getRepository(Tables.basket).save(basket);
  return true;
}
