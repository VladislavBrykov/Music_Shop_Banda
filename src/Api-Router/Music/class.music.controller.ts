import { Request, Response } from 'express';
import { injectable, inject, Container } from 'inversify';
import 'reflect-metadata';
import { Musics } from '../../interfaces';
import { TYPES } from '../../types';
import path from 'path';
import MusicService from '../../Service/Music/music.service.functional';
import * as dotenv from 'dotenv';

dotenv.config({});
import { stripeInquiry } from './Secondary/stripe.inquiry';
import valid from '../../Helpers/incoming.data.validator';
import { saveImgS3 } from './Secondary/save.img.s3';
import { getUrl } from './Secondary/get.url.image';

@injectable()
class MusicController {
  private capacityMusic: { myContainer: Container; MusicService: Musics };

  constructor(
    @inject(TYPES.Musics)
    MusicService: {
      myContainer: Container;
      MusicService: Musics;
    }
  ) {
    this.capacityMusic = MusicService;
  }

  static musicMain = async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../../views', '/music.html'));
  };

  static myMusicPage = async (req: Request, res: Response) => {
    if (!req.headers)
      res.sendFile(
        path.join(__dirname, '../../../views', '/authentication.html')
      );
    res.sendFile(path.join(__dirname, '../../../views', '/my-music.html'));
  };

  static musicList = async (req: Request, res: Response) => {
    const allMusic: object = await MusicService.musicOnMain();
    res.send(allMusic);
  };

  static stripe = async (req: Request, res: Response) => {
    res.render('cart', {
      key: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  };

  static stripePost = async (req: Request, res: Response) => {
    await valid.stripePostInputData(req.body);
    const finalPrice: number = await MusicService.finalPriceByEmail(
      req.body.stripeEmail
    );
    const { stripeEmail, stripeToken } = req.body;
    await MusicService.saveSoundForUser(stripeEmail);
    await stripeInquiry(stripeEmail, stripeToken, finalPrice);
    res.redirect('/my-music');
  };

  static soundToBasket = async (req: Request, res: Response) => {
    await valid.soundToBasketInputData(req.body);
    const { id_user, id_sound } = req.body;
    const basketUser: object = await MusicService.soundToBasket(
      id_user,
      id_sound
    );
    res.send(basketUser);
  };

  static soundFromBasket = async (req: Request, res: Response) => {
    await valid.idUserInputData(req.body);
    const { id_user } = req.body;
    const basketUser: object = await MusicService.soundFromBasket(
      id_user,
      false
    );
    res.send(basketUser);
  };

  static mySoundFromBasket = async (req: Request, res: Response) => {
    await valid.idUserInputData(req.body);
    const { id_user } = req.body;
    const basketUser: object = await MusicService.soundFromBasket(
      id_user,
      true
    );
    res.send(basketUser);
  };

  static createMusicCardPage = async (req: Request, res: Response) => {
    res.sendFile(
      path.join(__dirname, '../../../views', '/create-music-card.html')
    );
  };

  static createMusicCard = async (req: Request, res: Response) => {
    const { title, musician, price, category, description, image } = req.body;
    await MusicService.saveMusic(
      title,
      musician,
      price,
      category,
      description,
      image
    );
    res.send({ status: true });
  };

  static saveImage = async (req: Request, res: Response) => {
    await saveImgS3(req.file);
    res.send(req.file.filename.substring(1));
  };

  static getImage = async (req: Request, res: Response) => {
    const { filename } = req.body;
    const url: string = await getUrl(filename);
    res.send(url);
  };
}

export default MusicController;
