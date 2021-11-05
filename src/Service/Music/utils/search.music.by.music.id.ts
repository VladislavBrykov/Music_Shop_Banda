import { getConnection } from 'typeorm';
import { ErrorsForMusic } from '../../../Constants/errors';
import { Tables } from '../../../Constants/tables';
export async function searchMusicsByMusicId(id_sound) {
  const searchNMusicById: any = await getConnection()
    .getRepository(Tables.music)
    .findOne({
      where: { id: id_sound },
    });
  if (searchNMusicById) {
    return searchNMusicById;
  } else {
    throw new Error(ErrorsForMusic.MusicNotExists);
  }
}
