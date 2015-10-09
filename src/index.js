var NameCrypt = function () {
    var cache = require('memory-cache');

    function _encrypt(name) {
        var name = (name.length % 2 !== 0) ? name + '#' : name,
            length = name.length,
            pieces = name.split(''),
            half = Math.round(length / 2),
            first = pieces.slice(0, half),
            last = pieces.slice(half, length);
        return [first.join(''), last.join('')].reverse().join('');
    }

    function _decrypt(name) {
        var pieces = name.split(''),
            length = pieces.length,
            middle = Math.round(length / 2);

        return [pieces.slice(middle, length).join(''), pieces.slice(0, middle).join('')].join('');
    }

    this.encrypt = function encrypt(name) {
        var encrypted, found = cache.get(name);
        if (found) {
            return found;
        } else {
            encrypted = _encrypt(name);
            cache.put(name, encrypted);
            return encrypted;
        }
    };

    this.decrypt = function decrypt(name) {
        var decrypted, found = cache.get(name);
        if (found) {
            return found;
        } else {
            decrypted = _decrypt(name);
            cache.put(name, decrypted);
            return decrypted;
        }
    };

    this.cache = cache;
}

module.exports = new NameCrypt();
