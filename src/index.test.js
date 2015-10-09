/* globals describe, it */
var nameCrypt = require('./index.js'),
    expect = require('chai').expect;

describe('name-crypt', function() {

    it('It should have a encrypt method', function() {
        expect(nameCrypt).to.have.ownProperty('encrypt');
    });

    it('It should have a decrypt method', function() {
        expect(nameCrypt).to.have.ownProperty('decrypt');
    });

    it('It should have a cache property', function() {
        expect(nameCrypt).to.have.ownProperty('cache');
    });

    it('If the non-encrypted name is NOT in the cache, return the encrypted name', function() {
        nameCrypt.cache.clear();
        var encrypted = nameCrypt.encrypt('Sridhar');
        expect(encrypted).to.equal('har#Srid');
    });

    it('If the non-encrypted name is IN the cache, return the encrypted name', function() {
        var encrypted = nameCrypt.encrypt('Sridhar');
        expect(encrypted).to.equal('har#Srid');
    });

    it('If the encrypted name is NOT in the cache, return the non-encrypted name', function() {
        nameCrypt.cache.clear();
        expect(nameCrypt.cache.get('ilAn')).to.equal(null);
        var decrypted = nameCrypt.decrypt('ilAn');
        expect(decrypted).to.equal('Anil');
    });

    it('If the encrypted name is IN the cache, return the non-encrypted name', function() {
        expect(nameCrypt.cache.get('ilAn')).to.equal('Anil');
        var decrypted = nameCrypt.decrypt('ilAn');
        expect(decrypted).to.equal('Anil');
    });

});
