import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import { COOKIE_KEY_SECRET } from '$env/static/private';

export const decryptServerCookie = (data = '') => {
  try {
    const decrypt = AES.decrypt(data, COOKIE_KEY_SECRET);
    return JSON.parse(decrypt.toString(encUtf8));
  } catch (error) {
    console.error('Failed to decrypt cookie', error);
    return null;
  }
};
