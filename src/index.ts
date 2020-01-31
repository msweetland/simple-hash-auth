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

export class AuthWrapper {
  write: WriteUserCallBack;
  read: ReadUserCallBack;
  onAuthSuccess: OnAuth;
  onAuthFailure: VoidFunction;
  constructor(
    writeUserCallback: WriteUserCallBack,
    readUserCallback: ReadUserCallBack,
    onAuthSuccess: OnAuth,
    onAuthFailure: VoidFunction
  ) {
    this.write = writeUserCallback;
    this.read = readUserCallback;
    this.onAuthSuccess = onAuthSuccess;
    this.onAuthFailure = onAuthFailure;
  }

  public createUser = (username: string, password: string) => {
    const user = createUser(username, password);
    this.write(user);
  };

  public authenticateUser = (username: string, password: string) => {
    const userObj = this.read(username);
    const isValid = authUser(password, userObj.storageHash);
    if (isValid) {
      this.onAuthSuccess(username);
    } else {
      this.onAuthFailure();
    }
  };
}
