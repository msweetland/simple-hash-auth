export declare const SEPERATOR = "$";
export declare const ALGORITHM = "sha512";
export declare const hashPassword: (password: string, salt: string) => string;
export declare const createUser: (username: string, password: string) => AuthUser;
export declare const authUser: (password: string, storageHash: string) => boolean;
//# sourceMappingURL=index.d.ts.map