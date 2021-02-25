import CryptoJS from 'crypto-js';

export default {

  encrypt(data) {
    const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse('gddlkj0123456789'), {
      iv: CryptoJS.enc.Utf8.parse('gddlkj0123456789'),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return result.toString();
  },

  decrypt(cipher) {
    if (cipher === null || cipher === undefined) return '';
    const decrypted = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse('gddlkj0123456789'), {
      iv: CryptoJS.enc.Utf8.parse('gddlkj0123456789'),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
  },

};
