# node-proxy-server
Rely on [node-http-proxy](https://github.com/http-party/node-http-proxy)

Simply add domain name and proxy target.

```js
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
      keyPath: path.resolve(__dirname, './exampleA.com-key.pem'),
      certPath: './exampleA.com-cert.pem',
    },
    '(.*).exampleB.com': {
      keyPath: './exampleB.com-key.pem',
      certPath: './exampleB.com-cert.pem',
    },
  },
}
```
