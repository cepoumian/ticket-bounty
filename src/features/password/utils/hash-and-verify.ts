import { hash, verify } from "@node-rs/argon2";

export const hashPassword = (password: string) =>
  hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

export const verifyPasswordHash = (passwordHash: string, password: string) =>
  verify(passwordHash, password);
