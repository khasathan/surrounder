/*
 * @author Korkeat W. <khasathan@gmail.com>
 */

'use strict';

var assert = require('assert'),
    Surrounder = require('../lib/surrounder.js').Surrounder;

describe('surrounder testing', function () {
    var surd;

    before(function () {
        surd = new Surrounder();
    });

    it('surround() should not throw error', function (done) {
        assert.doesNotThrow(function () {
            surd.surround(['ab'], 'xxxxxxabxxxxx');
        }, Error);
        done();
    });

    it('\'ab\' should be surrounded', function (done) {
        var in1 = ['ab'],
            in2 = 'xxxxxxabxxxxx',
            expect = 'xxxxxx<strong>ab</strong>xxxxx',
            actual = surd.surround(in1, in2);
        assert.equal(actual, expect);
        done();
    });

    it('\'ab\' and \'bc\' should be surrounded both', function (done) {
        var in1 = ['ab', 'bc'],
            in2 = 'xxxxxxabxxbcxxx',
            expect = 'xxxxxx<strong>ab</strong>xx<strong>bc</strong>xxx',
            actual = surd.surround(in1, in2);
        assert.equal(actual, expect);
        done();
    });

    it('\'abbbbb\' and \'bbbbbc\' should be overlap surrounded', function (done) {
         var in1 = ['abbbbb', 'bbbbbc'],
            in2 = 'xxxxxxabbbbbcxxx',
            expect = 'xxxxxx<strong>a<strong>bbbbb</strong>c</strong>xxx',
            actual = surd.surround(in1, in2);
        assert.equal(actual, expect);
        done();
    });

    it('\'abbbbb\' and \'bbb\' should be surrounded substring', function (done) {
         var in1 = ['abbbbb', 'bbb'],
            in2 = 'xxxxxxabbbbbcxxx',
            expect = 'xxxxxx<strong>a<strong>bbb</strong>bb</strong>cxxx',
            actual = surd.surround(in1, in2);
        assert.equal(actual, expect);
        done();
    });

    it('returns same as input 2 if not match any member in array', function (done) {
        var in1 = ['111', '2222'],
            in2 = 'xxxxxxabbbbbcxxx',
            expect = 'xxxxxxabbbbbcxxx',
            actual = surd.surround(in1, in2);
        assert.equal(actual, expect);
        done();
    });

    it('returns same as input 2 if not exact match any member in array', function (done) {
        var in1 = ['abbb', '2222'],
            in2 = 'xxxxxxabbbbbcxxx',
            expect = 'xxxxxxabbbbbcxxx',
            actual = surd.surround(in1, in2);
        assert.equal(actual, expect);
        done();
    });
});
