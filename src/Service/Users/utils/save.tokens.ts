import newTokenCreator from './create.token';
import { Token } from '../../../interfaces';

export async function saveTokens(searchUser, phoneEmail) {
  const jwtToken: Token = await newTokenCreator(phoneEmail);
  const refreshToken: Token = await newTokenCreator(phoneEmail);
  return { jwtToken, refreshToken };
}
