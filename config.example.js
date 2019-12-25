
module.exports = {
  proxyHttpsServerProt: 443,
  proxyHttpServerProt: 80,
  configs: [
    {
      domain: 'exampleA.com',
      target: 'http://localhost:3000',
    },
    {
      domain: '(.*).exampleB.com',
      target: 'http://localhost:3001',
    },
  ],
  certificates: {
    'exampleA.com': {
      keyPath: './exampleA.com-key.pem',
      certPath: './exampleA.com-cert.pem',
    },
    '(.*).exampleB.com': {
      keyPath: './exampleB.com-key.pem',
      certPath: './exampleB.com-cert.pem',
    },
  },
}
