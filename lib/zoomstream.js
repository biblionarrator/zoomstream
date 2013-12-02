"use strict";
var zoom = require('node-zoom'),
    Readable = require('stream').Readable,
    util = require('util');

util.inherits(ZOOMStream, Readable);

function ZOOMStream(conn, query, options) {
    options = options || { };
    options.encoding = options.encoding || 'utf8';
    Readable.call(this, options);
    var self = this;

    this._counter = 0;
    this._q = query;
    if (typeof conn === 'string') {
        this._conn = new zoom.Connection(conn);
        this._conn.connect(_query);
    } else if (conn.constructor === zoom.Connection) {
        this._conn = conn;
        if (this._conn.connect) {
            this._conn.connect(_query);
        } else {
            _query(null);
        }
    } else {
        throw(new Error('Unable to create stream: unknown connection parameter'));
    }

    function _query(err) {
        self._query = new zoom.Query(self._q);
        self._conn.search(self._query, function (err, recordset) {
            self._recordset = recordset;
            if (self._reading) _read();
        });
    }

    function _read() {
        if (!self._recordset) return;
        var rec = self._recordset.record(self._counter++);
        if (rec) {
            self.push(rec.xml(), 'utf8');
        } else {
            self.push(null);
        }
    }

    this._read = function (size) {
        this._reading = true;
        _read();
    };
};

module.exports = ZOOMStream;
