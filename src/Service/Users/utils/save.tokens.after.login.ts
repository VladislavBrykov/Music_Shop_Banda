import newTokenCreator from './create.new.token';

export async function saveTokensAfterLogin(searchUser, phoneEmail) {
  const jwtToken = await newTokenCreator(phoneEmail);
  const refreshToken = await newTokenCreator(phoneEmail);
  return { jwtToken, refreshToken };
}
