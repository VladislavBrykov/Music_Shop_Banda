import jwt from 'jsonwebtoken';

export default async function newTokenCreator(phoneEmail) {
  return jwt.sign(
    {
      foo: phoneEmail,
    },
    process.env.TOKEN_SECRET_KEY
  );
}
