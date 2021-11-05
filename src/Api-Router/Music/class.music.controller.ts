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
    res.sendFile(path.join(__dirname, '../../../views', '/my-music.html'));
  };

  static musicList = async (req: Request, res: Response) => {
    const allMusic = await MusicService.musicOnMain();
    res.send(allMusic);
  };

  static stripe = async (req: Request, res: Response) => {
    res.render('cart', {
      key: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  };

  static stripePost = async (req: Request, res: Response) => {
    await valid.stripePostInputData(req.body);
    const finalPrice = await MusicService.finalPriceByEmail(
      req.body.stripeEmail
    );
    const { stripeEmail, stripeToken } = req.body;
    await MusicService.saveSoundForUser(stripeEmail);
    stripeInquiry(stripeEmail, stripeToken, finalPrice)
      .then((charge) => {
        res.redirect('/my-music');
      })
      .catch((err) => {
        res.send(err);
      });
  };

  static soundToBasket = async (req: Request, res: Response) => {
    await valid.soundToBasketInputData(req.body);
    const { id_user, id_sound } = req.body;
    const basketUser = await MusicService.soundToBasket(id_user, id_sound);
    res.send(basketUser);
  };

  static soundFromBasket = async (req: Request, res: Response) => {
    await valid.idUserInputData(req.body);
    const { id_user } = req.body;
    const basketUser = await MusicService.soundFromBasket(id_user, false);
    res.send(basketUser);
  };

  static mySoundFromBasket = async (req: Request, res: Response) => {
    await valid.idUserInputData(req.body);
    const { id_user } = req.body;
    const basketUser = await MusicService.soundFromBasket(id_user, true);
    res.send(basketUser);
  };
}

export default MusicController;
