import { getConnection } from 'typeorm';
import { ErrorsForMusic } from '../../../Constants/errors';
import { Tables } from '../../../Constants/tables';
import Music from '../../../entity/Music';
export async function searchMusicsByMusicId(id_sound) {
  const searchNMusicById = await getConnection()
    .getRepository<Music>(Tables.music)
    .findOne({
      where: { id: id_sound },
    });
  if (searchNMusicById) {
    return searchNMusicById;
  } else {
    throw new Error(ErrorsForMusic.MusicNotExists);
  }
}
