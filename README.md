# zoomstream

Library for turning ZOOM queries into Node.js Readable streams

## Usage

```javascript
var ZOOMStream = require('zoomstream');

var stream = new ZOOMStream('lx2.loc.gov:210/LCDB', '@attr 1=7 "087111559X"');
stream.on('data', function (rec) {
    // rec will be a string containing the MARCXML representation of the record.
});
```

## Reference

### ZOOMStream constructor

Arguments:

* `connection` - either a connection string (host:port/database) or an existing node-zoom connection
* `query` - PQF query
* `options` - {optional} options for the stream (passed through to Readable)

## License
Copyright (c) 2013 Jared Camins-Esakov
Licensed under the MIT license.
