import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import { addInformationAboutMusic } from './utils/add.informatian.about.music';
import newMusicInBasket from './utils/add.new.music.in.basket';
import { calculateFinalPrice } from './utils/calculate.final.price';
import { searchUserByLogin } from './utils/seacrh.user.by.login';
import { searchMusicUserByUserID } from './utils/search.music.user';
import { searchMusicsByIdUser } from './utils/search.musics.by.id.user';
import { updateMusicRootTrue } from './utils/update.music.root.true';
import { Tables } from '../../Constants/tables';

@injectable()
class MusicService {
  constructor() {}

  static async musicOnMain() {
    const allMusic = await getConnection().getRepository(Tables.music).find();
    return allMusic;
  }

  static async soundFromBasket(id_user, root) {
    const musicInBasket = await searchMusicsByIdUser(id_user, root);
    return await addInformationAboutMusic(musicInBasket);
  }

  static async saveSoundForUser(email) {
    const searchUser = await searchUserByLogin(email);
    const searchMusicUser = await searchMusicUserByUserID(searchUser[0].id);
    await updateMusicRootTrue(searchMusicUser);
  }

  static async soundToBasket(id_user, id_sound) {
    await newMusicInBasket(id_sound, id_user);
    const musicInBasket = await getConnection()
      .getRepository(Tables.basket)
      .find();
    return musicInBasket;
  }

  static async finalPriceByEmail(email) {
    const searchUser = await searchUserByLogin(email);
    const musicInBasket = await searchMusicsByIdUser(searchUser[0].id, true);
    return calculateFinalPrice(musicInBasket);
  }
}

export default MusicService;
