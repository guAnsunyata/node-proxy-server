var http = require('http')
var httpProxy = require('http-proxy')
var proxy = httpProxy.createProxyServer({})
var config = require('./config')
const { configs, proxyServerProt } = config

proxy.on('error', function(err, req, res) {
  res.writeHead(500, {'Content-Type': 'text/plain'})
  res.end('Something went wrong.')
})

var server = http.createServer(function(req, res) {
  const { host } = req.headers
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  const domain = host.match(/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im)[1]
  const targetConfig = configs.find(config => config.domain === domain)

  console.log('client ip: ' + ip + ', host: ' + host + ', target: ' + targetConfig.target)
  proxy.web(req, res, {
    target: targetConfig.target,
  })
})

console.log(`listening on proxy-port ${proxyServerProt}`)
server.listen(proxyServerProt)