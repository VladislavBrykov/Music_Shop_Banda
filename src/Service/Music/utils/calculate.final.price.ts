import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';

export async function calculateFinalPrice(musicInBasket) {
  let i = 0;
  let finalPrice = 0;
  while (musicInBasket[i]) {
    const obj = musicInBasket[i];
    const result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
    let musicPrice = await getConnection()
      .getRepository(Tables.music)
      .find({
        where: { id: result[2][1] },
      });
    musicPrice = Object.keys(musicPrice).map((key) => [
      Number(key),
      musicPrice[key],
    ]);
    finalPrice += Number(musicPrice[0][1].price);
    i++;
  }
  return finalPrice;
}
