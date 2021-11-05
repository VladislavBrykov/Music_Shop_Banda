export enum ErrorsForUser {
  SearchUser = 'Users not exists',
  UserExists = 'User exists',
  AuthorizationError = 'Authorization required',
  JWTNotValid = 'JWTToken not valid, user not exists',
}

export enum ErrorAsyncFunctionWrapper {
  MyDefaultError = 'The server encountered an unknown error',
}

export enum ErrorsForMusic {
  MusicNotExists = 'Music not exists',
}
