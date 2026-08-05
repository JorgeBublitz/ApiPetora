import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const hashUtil = {
  hash: (password: string) => bcrypt.hash(password, SALT_ROUNDS),
  compare: (password: string, hash: string) => bcrypt.compare(password, hash),
};
