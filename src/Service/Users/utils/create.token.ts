import jwt from 'jsonwebtoken';
import { Token } from '../../../interfaces';

export default async function newTokenCreator(
  phoneEmail: string
): Promise<Token> {
  return jwt.sign(
    {
      foo: phoneEmail,
    },
    process.env.TOKEN_SECRET_KEY
  );
}
