import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

export default async function generateCode() {
  const plain = String(crypto.randomInt(100000, 1000000));

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plain, salt);

  return {
    plain,
    hash
  };
}