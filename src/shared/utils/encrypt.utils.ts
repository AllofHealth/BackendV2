import * as crypto from 'crypto';

const KEY = 'i02lvumS2enyb9ovJrETPRIwojy8W1X6MdQUaOO6rLc=';

interface Encrypt {
  data: string;
  key?: string;
}

export function encrypt(args: Encrypt) {
  const { data, key } = args;
  const iv = crypto.randomBytes(16);
  let EncryptedKey = KEY;

  if (key) EncryptedKey = key;
  const BufferKey = Buffer.from(EncryptedKey, 'base64');

  const cipher = crypto.createCipheriv('aes-256-cbc', BufferKey, iv);

  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export function decrypt(args: Encrypt) {
  const { data, key } = args;
  const textParts = data.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');

  let EncryptedKey = KEY;
  if (key) EncryptedKey = key;

  const BufferKey = Buffer.from(EncryptedKey, 'base64');

  const decipher = crypto.createDecipheriv('aes-256-cbc', BufferKey, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
