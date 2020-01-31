import { createHash } from 'crypto';
import uuid from 'uuid';

export const SEPERATOR = '$';
export const ALGORITHM = 'sha512';

export const hashPassword = (password: string, salt: string): string => {
  const saltBuffer = Buffer.from(salt, 'utf8');
  const saltHex = saltBuffer.toString('hex');
  const salted_password = saltHex + password;
  const hasher = createHash(ALGORITHM);
  const data = hasher.update(salted_password, 'utf8');
  const hashedPassword = data.digest('hex');
  return [ALGORITHM, saltHex, hashedPassword].join(SEPERATOR);
};

export const createUser = (username: string, password: string): AuthUser => ({
  username,
  storageHash: hashPassword(password, uuid.v4()),
});

export const authUser = (password: string, storageHash: string): boolean => {
  const [algorithm, saltHex, hashedPassword] = storageHash.split(SEPERATOR);
  const salted_password = saltHex + password;
  const hasher = createHash(algorithm);
  const data = hasher.update(salted_password, 'utf8');
  return hashedPassword === data.digest('hex');
};
