import express from 'express';
import { asyncFunctionWrapper } from '../Helpers/async.function.wrapper';

const apiRouter = express.Router();
import UserController from './Users/class.user.controller';
import userServices from '../inversify.config';
import MusicController from './Music/class.music.controller';
import limitedCheckFactorWithToken from '../Helpers/limited.check.factor';
import { upload } from '../Helpers/multer.setting';

const classUserController = new UserController(userServices);

//Pages
apiRouter.get(
  '/authentication',
  asyncFunctionWrapper(classUserController.loginPage)
);
apiRouter.get('/basket', asyncFunctionWrapper(MusicController.stripe));
apiRouter.get('/my-music', asyncFunctionWrapper(MusicController.myMusicPage));
apiRouter.get('/', asyncFunctionWrapper(MusicController.musicMain));

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

//Admin
apiRouter.get(
  '/create-music-card',
  asyncFunctionWrapper(MusicController.createMusicCardPage)
);
apiRouter.post(
  '/create-music-card',
  asyncFunctionWrapper(MusicController.createMusicCard)
);

declare module 'express' {
  interface Request {
    body: any;
    file: any;
  }
}

apiRouter.post(
  '/save-image',
  upload.single('image'),
  asyncFunctionWrapper(MusicController.saveImage)
);

apiRouter.post(
  '/get-url-image',
  asyncFunctionWrapper(MusicController.getImage)
);
export default apiRouter;
