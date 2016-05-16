'use strict';

import cache from 'memory-cache';

/** @class NameCrypt */
class NameCrypt {
    constructor() {
        /**
        * @member {object} cache
        */
        this.cache = cache;
    }
    /**
    * @function isEven
    * If first bit is off signifies is an even number
    * @param {*} n - If not a number returns undefined
    */
    isOdd(n) {
        return n & 1;
    }

    /**
    * @function halfPoint
    * Returns the half point of a number
    * @param {*} n - If not a number returns NaN
    */
    halfPoint(n) {
        return Math.round(+n / 2);
    }

    /**
    * @function _encrypt
    * Splits the name into two equal parts.
    * If it is an odd number length, then add a # at the end
    * Reverse the parts and concatenate back
    * @param {string} name - Name to decrypt
    */
    _encrypt(name) {
        name += this.isOdd(name.length) && '#';
        var length = name.length,
            middle = this.halfPoint(length),
            pieces = name.split(''),
            first = pieces.slice(0, middle),
            last = pieces.slice(middle, length);

        return [].concat(last, first).join('');
    }

    /**
    * @function _decrypt
    * Remove the hash (#) if present
    * Reverse the parts and concatenate back
    * @param {string} name - Name to decrypt
    */
    _decrypt(name) {
        var pieces = name.replace('#', '').split(''),
            length = pieces.length,
            middle = this.halfPoint(length),
            first = pieces.slice(0, middle),
            last = pieces.slice(middle, length);

        return [].concat(last, first).join('');
    }

    /**
    * @member {function} encrypt
    * If the non-encrypted name is in the cache, just return the encrypted name
    * Otherwise encrypt the name per the encryption algorithm, add to the cache, and return the encrypted name
    * @param {string} name - Name to encrypt
    */
    encrypt(name) {
        if (!name) return;
        var encrypted, found = cache.get(name);
        if (found) {
            return found;
        } else {
            encrypted = this._encrypt(name);
            cache.put(name, encrypted);
            return encrypted;
        }
    }

    /**
    * @member {function} decrypt
    * If the encrypted name is in the cache, return the non-encrypted name
    * Otherwise decrypt the name by reversing the encryption algorithm, add to the cache, and return the non-encrypted name
    * @param {string} name - Name to decrypt
    */
    decrypt(name) {
        if (!name) return;
        var decrypted, found = cache.get(name);
        if (found) {
            return found;
        } else {
            decrypted = this._decrypt(name);
            cache.put(name, decrypted);
            return decrypted;
        }
    }
}

export default new NameCrypt();
