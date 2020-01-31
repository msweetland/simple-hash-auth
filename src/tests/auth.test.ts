import {
  hashPassword,
  SEPERATOR,
  ALGORITHM,
  createUser,
  authUser,
} from '../index';

test('Test create hash', () => {
  const salt = 'qwerty';
  const password = 'qwerty';
  const storageHash = hashPassword(password, salt);

  const [algorithm, saltHex, hashedPass] = storageHash.split(SEPERATOR);
  expect(algorithm).toEqual(ALGORITHM);
  expect(saltHex).toEqual('717765727479');
  expect(hashedPass).toEqual(
    '74677e754ae9a0c7cfca4a4b21ccbb7488b666828f0691362c025694fc6b04edafe10e724d96561cb377bab9fe0ba49c2c90ea2b1d1cf8cbce08e9b6199963a0'
  );
});

test('Test Authentication', () => {
  const username = 'test';
  const password = 'qwerty';
  const { storageHash } = createUser(username, password);
  expect(authUser(password, storageHash)).toEqual(true);
  expect(authUser('notQwerty', storageHash)).toEqual(false);
});
