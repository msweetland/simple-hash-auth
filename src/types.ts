interface AuthUser {
  username: string;
  storageHash: string;
}

type WriteUserCallBack = (user: AuthUser) => void;
type ReadUserCallBack = (username: string) => AuthUser;
type OnAuth = (username: string) => void;
