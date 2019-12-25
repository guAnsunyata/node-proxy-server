const fs = require('fs')
const http = require('http')
const https = require('https')
const tls = require("tls")
const httpProxy = require('http-proxy')
const proxy = httpProxy.createProxyServer({})
const config = require('./config')
const { configs, proxyHttpServerProt, proxyHttpsServerProt, certificates } = config

const options = {
  key: fs.readFileSync('./key.pem'), // https.createServer required property
  cert: fs.readFileSync('./cert.pem'), // https.createServer required property
  SNICallback: (servername, cb) => {
    const target = Object.keys(certificates).find((key) => {
      return new RegExp(key).test(servername)
    })
    const certificate = certificates[target]

    if (!certificate) return cb(null, ctx)

    const ctx = tls.createSecureContext(Object.assign(
      {}, // more https.createServer options
      {
        key: fs.readFileSync(certificate.keyPath, 'utf8'),
        cert: fs.readFileSync(certificate.certPath, 'utf8'),
      }
    ))
    return cb(null, ctx)
  },
}

const handle = function (req, res) {
  const { host } = req.headers
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  const domain = host.match(/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n]+)/im)[1]
  const targetConfig = configs.find(config => new RegExp(config.domain).test(domain)) || {}

  console.log('client ip: ' + ip + ', host: ' + host + ', target: ' + targetConfig.target)
  if (targetConfig) {
    proxy.web(req, res, {
      target: targetConfig.target,
    })
  }
}

// HTTPS
const server = https.createServer(options, handle)

// HTTP
const httpServer = http.createServer({}, handle)

// proxy error handling
proxy.on('error', function(err, req, res) {
  res.writeHead(500, {'Content-Type': 'text/plain'})
  res.end('Something went wrong.')
})

server.listen(proxyHttpsServerProt)
console.log(`listening on proxy-port ${proxyHttpsServerProt}`)

httpServer.listen(proxyHttpServerProt)
console.log(`listening on proxy-port ${proxyHttpServerProt}`)
