// // *** Test config SSL Certificate server *** //
// const fs = require('fs');
// const https = require('https');
// // *** Test config SSL Certificate server *** //
// const express = require('express')
// const next = require('next')
// const nextI18NextMiddleware = require('next-i18next/middleware')
// const nextI18next = require('./i18n')

// const port = process.env.PORT || 3000
// const app = next({ dev: process.env.NODE_ENV !== 'production' })
// const handle = app.getRequestHandler();

// (async () => {
//   // *** Test config SSL Certificate server *** //
//   var https_options = {
//     key: fs.readFileSync("/private_key.txt"),
//     cert: fs.readFileSync("/Certificate.txt"),
//     ca: fs.readFileSync('/Certificate_chain.txt')
//   };
//   var port = process.env.PORT || 3000;
//   var server = https.createServer(https_options, app);

//   server.listen(port, function () {
//     console.log('Hello IREALLYHOST listening on port ' + server.address().port);
//   });
//   // *** Test config SSL Certificate server *** //

//   await app.prepare()
//   const server = express()

//   try {
//     await server.use(nextI18NextMiddleware(nextI18next))

//   } catch (error) {
//     throw (error)
//   }

//   await server.get('*', (req, res) => handle(req, res))

//   await server.listen(port)
//   console.log(`> Ready on http://localhost:${port}`)
// })()


















const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware')

const nextI18next = require('./i18n')

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

(async () => {
  await app.prepare()
  const server = express()

  try {
    await server.use(nextI18NextMiddleware(nextI18next))

  } catch (error) {
    throw (error)
  }

  await server.get('*', (req, res) => handle(req, res))

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`)
})()
