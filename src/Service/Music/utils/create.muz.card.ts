import { searchMusicsByMusicId } from './get.muz.by.muz.id';
import Basket from '../../../entity/Basket';
import Music from '../../../entity/Music';

export async function addInformationAboutMusic(musicInBasket): Promise<Basket> {
  let numberSound = 0;
  while (musicInBasket[numberSound]) {
    const searchNMusicById: Music = await searchMusicsByMusicId(
      musicInBasket[numberSound].id_sound
    );
    musicInBasket[numberSound].title = searchNMusicById.title;
    musicInBasket[numberSound].image = searchNMusicById.image;
    musicInBasket[numberSound].price = searchNMusicById.price;
    musicInBasket[numberSound].author = searchNMusicById.author;
    numberSound++;
  }
  return musicInBasket;
}
