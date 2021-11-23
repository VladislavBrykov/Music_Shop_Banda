import * as jwt from 'jsonwebtoken';
import { ErrorsForUser } from '../Constants/errors';

async function tokenValidator(token): Promise<boolean> {
  return await jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err) {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
}

async function limitedCheckFactorWithToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.redirect('/my-account');
  }
  if (!(await tokenValidator(token)))
    res.status(403).json({ error: ErrorsForUser.JWTNotValid });
  else next();
}

export default limitedCheckFactorWithToken;
