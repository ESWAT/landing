
Postmark           = require 'postmark'
{Service, swagger} = require 'service'
Controller         = require './controller'
Handlers           = require './handlers'
pkg                = require './package.json'


config =
    host: process.env.services__landing__host     or '127.0.0.1'
    port: process.env.services__landing__port     or 10000
    sender: process.env.services__landing__sender or 'team@42debut.com'
    postmark:
        key: process.env.services__landing__postmark_key


postmark   = new Postmark(config.postmark.key)
controller = new Controller({sender:config.sender, postmark})
handlers   = new Handlers({controller})


service = new Service
    name:     pkg.name
    version:  pkg.version
    handlers: handlers


service.listen config.port, config.host, config.base
