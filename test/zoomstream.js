"use strict";
var assert = require('assert');
var ZOOMStream = require('../lib/zoomstream'),
    zoom = require('node-zoom');

describe('ZOOMStream', function() {
    var stream;
    it('can be created', function (done) {
        stream = new ZOOMStream('lx2.loc.gov:210/LCDB', '@attr 1=7 "087111559X"');
        assert(stream);
        done();
    });
    it('triggers data event with record', function (done) {
        stream.on('data', function (rec) {
            assert(rec);
        });
        stream.on('end', done);
    });
    it('triggers readable event and can be read using stream.read', function (done) {
        stream = new ZOOMStream('lx2.loc.gov:210/LCDB', '@attr 1=7 "087111559X"');
        var count = 0;
        stream.on('readable', function () {
            if (count++ === 0) {
                var rec = stream.read();
                assert(rec);
            }
        });
        stream.on('end', done);
    });
    it('can reuse an existing node-zoom connection and get record', function (done) {
        var conn = new zoom.Connection('lx2.loc.gov:210/LCDB');
        conn.connect(function (err) {
            stream = new ZOOMStream(conn, '@attr 1=7 "087111559X"');
            assert(stream);
            stream.on('data', function (rec) {
                assert(rec);
            });
            stream.on('end', done);
        });
    });
});
