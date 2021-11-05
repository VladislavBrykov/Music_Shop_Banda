import express from 'express';
import { asyncFunctionWrapper } from '../Helpers/async.function.wrapper';
const apiRouter = express.Router();
import UserController from './Users/class.user.controller';
import userServices from '../inversify.config';
import MusicController from './Music/class.music.controller';
import limitedCheckFactorWithToken from '../Helpers/limited.check.factor';
const classUserController = new UserController(userServices);

//Pages
apiRouter.get(
  '/my-account',
  asyncFunctionWrapper(classUserController.loginPage)
);
apiRouter.get('/stripe', asyncFunctionWrapper(MusicController.stripe));
apiRouter.get('/my-music', asyncFunctionWrapper(MusicController.myMusicPage));
apiRouter.get('/music', asyncFunctionWrapper(MusicController.musicMain));

//Authentication
apiRouter.post(
  '/registration',
  asyncFunctionWrapper(classUserController.registration)
);
apiRouter.post('/login', asyncFunctionWrapper(classUserController.login));
apiRouter.get(
  '/refresh-token',
  asyncFunctionWrapper(classUserController.refreshToken)
);

//Users
apiRouter.get('/users', asyncFunctionWrapper(classUserController.allUsers));

//Music
apiRouter.get('/music-list', asyncFunctionWrapper(MusicController.musicList));
apiRouter.post(
  '/sound-from-basket',
  limitedCheckFactorWithToken,
  asyncFunctionWrapper(MusicController.soundFromBasket)
);
apiRouter.post(
  '/my-sound-from-basket',
  limitedCheckFactorWithToken,
  asyncFunctionWrapper(MusicController.mySoundFromBasket)
);
apiRouter.post('/payment', asyncFunctionWrapper(MusicController.stripePost));
apiRouter.post(
  '/sound-to-basket',
  limitedCheckFactorWithToken,
  asyncFunctionWrapper(MusicController.soundToBasket)
);

export default apiRouter;
