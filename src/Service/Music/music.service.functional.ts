import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import { addInformationAboutMusic } from './utils/create.muz.card';
import newMusicInBasket from './utils/music.to.basket';
import { calculateFinalPrice } from './utils/calculate.final.price';
import { searchUserByLogin } from './utils/get.user.by.login';
import { searchMusicUserByUserID } from './utils/get.muz.by.user';
import { getMuzByIdUser } from './utils/get.muz.by.id.user';
import { rootForMuz } from './utils/root.for.muz';
import { Tables } from '../../Constants/tables';
import { saveMusicInDd } from './utils/save.sound';
import Music from '../../entity/Music';
import Basket from '../../entity/Basket';
import User from '../../entity/User';

@injectable()
class MusicService {
  constructor() {}

  static async musicOnMain() {
    return await getConnection().getRepository<Music>(Tables.music).find();
  }

  static async soundFromBasket(id_user, root) {
    const musicInBasket: [Basket][] = await getMuzByIdUser(id_user, root);
    return await addInformationAboutMusic(musicInBasket);
  }

  static async saveSoundForUser(email) {
    const searchUser: User[] = await searchUserByLogin(email);
    const searchMusicUser: Basket[] = await searchMusicUserByUserID(
      searchUser[0].id
    );
    await rootForMuz(searchMusicUser);
    return true;
  }

  static async soundToBasket(id_user, id_sound) {
    await newMusicInBasket(id_sound, id_user);
    return await getConnection().getRepository<Basket>(Tables.basket).find();
  }

  static async finalPriceByEmail(email) {
    const searchUser: User[] = await searchUserByLogin(email);
    const musicInBasket: [Basket][] = await getMuzByIdUser(
      searchUser[0].id,
      false
    );
    return calculateFinalPrice(musicInBasket);
  }

  static async saveMusic(title, musician, price, category, description, image) {
    await saveMusicInDd(title, musician, price, category, description, image);
    return true;
  }
}

export default MusicService;
