import { getConnection } from 'typeorm';
import { Tables } from '../../../Constants/tables';
import Music from '../../../entity/Music';

export async function calculateFinalPrice(musicInBasket) {
  let numberSound = 0;
  let finalPrice: number = 0;
  while (musicInBasket[numberSound]) {
    const obj: object = musicInBasket[numberSound];
    const result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
    let musicPrice: object = await getConnection()
      .getRepository<Music>(Tables.music)
      .find({
        where: { id: result[2][1] },
      });
    musicPrice = Object.keys(musicPrice).map((key) => [
      Number(key),
      musicPrice[key],
    ]);
    finalPrice += Number(musicPrice[0][1].price);
    numberSound++;
  }

  return finalPrice + Number(process.env.STRIPE_DELIVERY);
}
