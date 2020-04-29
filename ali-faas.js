const { Server } = require('@webserverless/fc-express')
const app = require('./index')

const server = new Server(app)

// http trigger entry
module.exports.handler = function(req, res, context) {
  server.httpProxy(req, res, context)
}
