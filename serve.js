var express = require('express');
var exec    = require('child_process').exec;

var config = {
    port:   process.env.PORT   || 3000
  , secret: process.env.SECRET || 'lols'
  , branch: process.env.BRANCH || 'content-changes'
};

var app = express();

app.post("/deploy", function(req, res) {
    if (req.query.secret != config.secret) {
        res.send(403, 'wrong secret bro');
        return;
    }
    exec(__dirname + '/bin/update.sh ' + config.branch, function(err, stdout, stderr) {
        if (err) {
            res.send(500, stderr);
            return;
        }
        console.log(stdout);
        res.send(200);
    });
});

app.use(express.static(__dirname + "/build"));
app.listen(config.port);
