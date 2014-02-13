(function() {
  var buffaloData, collection, objects, results;

  buffaloData = require('./data-dumps/buffalo/collections.json');

  results = {};

  for (collection in buffaloData) {
    objects = buffaloData[collection];
    results[collection] = ((function() {
      var result;
      result = [Object.keys(objects[0])];
      result.concat(objects.map(function(object) {
        var header, row, _i, _len, _ref;
        row = [];
        _ref = headers[0];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          header = _ref[_i];
          row.push(object[header]);
        }
        return row;
      }));
      return result.map(function(row) {
        return row.join(',');
      });
    })()).join('\n');
  }

  Object.keys(results).forEach(function(collection) {
    console.log('writing:', collection);
    return fs.writeFile("./" + collection + ".csv", results[collection]);
  });

}).call(this);
