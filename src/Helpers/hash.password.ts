import * as bcrypt from 'bcrypt';
const saltRounds = bcrypt.genSaltSync(10);

export function hashPassword(password): string {
  const hash: string = bcrypt.hashSync(password, saltRounds);
  return hash;
}

export function decryptionPassword(password, hash) {
  const result = bcrypt.compareSync(password, hash);
  return result;
}
