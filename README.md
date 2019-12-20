# node-proxy-server
Rely on [node-http-proxy](https://github.com/http-party/node-http-proxy)

Simply add domain name and proxy target.
```js
module.exports = {
  proxyServerProt: 81,
  configs: [
    {
      domain: 'example-a.com.cat',
      target: 'http://localhost:3000',
    },
    {
      domain: 'example-b.com.cat',
      target: 'http://localhost:3001',
    },
  ],
}
```
