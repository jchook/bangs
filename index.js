const http = require('http')
const https = require('https')
const { URL } = require('url')
const encode = encodeURIComponent

/**
 * Handle an incoming HTTP request
 */
async function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`)
  const query = url.searchParams.get('q') || ''
  const terms = query.split(' ')

  // By default search Google
  let dest = `https://www.google.com/search?gbv=1&q=${encode(query)}`

  // BANG!
  if (terms[0][0] === '!') {
    switch (terms[0]) {
      case '!': // lucky
        dest = await feelingLucky(query)
        break
      default:
        dest = `https://duckduckgo.com/?q=${encode(query)}`
        break
    }
  }

  res.writeHead(302, { location: dest })
  res.end()
}

// Start the server
const server = http.createServer(handleRequest)
server.listen({
  host: process.env.host || 'localhost',
  port: process.env.port || 3000,
})

/**
 * Perform an "I'm Feeling Lucky" search on Google
 */
function feelingLucky(query) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      protocol: 'https:',
      hostname: 'www.google.com',
      port: 443,
      path: `/search?q=${encode(query)}&btnI`,
    }

    const req = https.request(options, res => {
      res.destroy()

      // We expect a redirect here
      if (res.statusCode !== 302) {
        const error = new Error(`Unexpected status code: ${res.statusCode}`) 
        return reject(error)
      }
      
      // Everything looks good.
      // Grab the target location and destroy the request/response
      const redirect = new URL(res.headers.location)
      resolve(redirect.searchParams.get('q'))
    })

    req.on('error', reject)
    req.end()
  })
}
