import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';
import Basket from '../../../entity/Basket';

export async function getMuzByIdUser(id_user, root) {
  return await getConnection()
    .getRepository<[Basket]>(Tables.basket)
    .find({
      where: { id_user, root: root },
    });
}
