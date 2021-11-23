import Music from '../../../entity/Music';
import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';

export async function saveMusicInDd(
  title,
  musician,
  price,
  category,
  description,
  image
) {
  const music: Music = new Music();
  music.title = title;
  music.price = price;
  music.image = image;
  music.category = category;
  music.author = musician;
  music.description = description;
  await getConnection().getRepository<Music>(Tables.music).save(music);

  return true;
}
