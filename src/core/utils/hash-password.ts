import { createHash } from 'crypto';

const hash = (algorithm: string, text: string) => {
  return createHash(algorithm).update(text).digest('hex');
};

const sha512 = (text: string) => {
  return hash('sha512', text);
};

export { sha512 };
