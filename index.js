const http = require('http')
const os = require('os')
const qs = require('querystring')

function upper (str) {
  return str.replace(/^\w|(-)\w/g, x => x.toUpperCase())
}

async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function handleWhoami (ctx) {
  const q = qs.parse(ctx.req.url.split('?')[1])
  if (q.wait && Number(q.wait)) {
    await sleep(Number(q.wait))
  }
  const socket = ctx.req.connection
  const remoteAddr = `${socket.remoteAddress}:${socket.remotePort}`
  const headers = Object.entries(ctx.req.headers)
  const ips = Object.values(os.networkInterfaces()).map(([{ address }]) => ['IP', address])

  const message = `${ctx.req.method} ${ctx.req.url} HTTP/${ctx.req.httpVersion}\n`
  const entries = [
    ['Hostname', os.hostname],
    ['RemoteAddr', remoteAddr],
    ...ips,
    ...headers
  ]

  const output = entries
    .map(([k, v]) => `${upper(k)}: ${decodeURIComponent(v)}`)
    .join('\n')
  ctx.body = message + output + '\n\n'
}

function Context (req, res) {
  this.req = req
  this.res = res
}

const app = async (req, res) => {
  const ctx = new Context(req, res)
  switch (req.url) {
    case '/bench': 
      ctx.body = 1
      break
    default:
      await handleWhoami(ctx)
  }
  res.end(ctx.body)
}

http.createServer(app).listen(3000, () => console.log(3000))

module.exports = app
