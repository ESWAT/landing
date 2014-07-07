var express = require('express');

var config = {
    port:   process.env.PORT   || 3000
};

var app = express();

app.use(express.static(__dirname + "/build"));
app.listen(config.port);
