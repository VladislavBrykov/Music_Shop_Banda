import { searchMusicsByMusicId } from './search.music.by.music.id';

export async function addInformationAboutMusic(musicInBasket) {
  let i = 0;
  while (musicInBasket[i]) {
    const searchNMusicById = await searchMusicsByMusicId(
      musicInBasket[i].id_sound
    );
    musicInBasket[i].title = searchNMusicById.title;
    musicInBasket[i].image = searchNMusicById.image;
    musicInBasket[i].price = searchNMusicById.price;
    musicInBasket[i].author = searchNMusicById.author;
    i++;
  }
  return musicInBasket;
}
