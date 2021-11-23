import * as bcrypt from 'bcrypt';

const saltRounds = bcrypt.genSaltSync(Number(process.env.BCRYPT_HASH_NUMBER));

export function hashPassword(password): string {
  return bcrypt.hashSync(password, saltRounds);
}

export function decryptionPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}
