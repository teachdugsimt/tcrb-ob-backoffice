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


















// const express = require('express')
// const next = require('next')
// const nextI18NextMiddleware = require('next-i18next/middleware')

// const nextI18next = require('./i18n')

// const port = process.env.PORT || 3000
// const app = next({ dev: process.env.NODE_ENV !== 'production' })
// const handle = app.getRequestHandler();

// (async () => {
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








const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

const jwt = require('jsonwebtoken');
const jwtSecret = "tcrb.infiltech.org";
const domain = `https://${api_gw_id || "dwl8p0fxml"}-${vpc_id || "vpce-03ae60b10934425db"}.execute-api.ap-southeast-1.amazonaws.com/`
const pathApi = 'api/backoffice/v1/signin'
// Middleware

// JSON parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(function (req, res, next) {
  // Allow Origins
  res.header("Access-Control-Allow-Origin", "*");
  // Allow Methods
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  // Allow Headers
  res.header("Access-Control-Allow-Headers", "Origin, Accept, Content-Type, Authorization");
  // Handle preflight, it must return 200
  if (req.method === "OPTIONS") {
    // Stop the middleware chain
    return res.status(200).end();
  }
  // Next middleware
  next();
});

// Auth middleware
app.use((req, res, next) => {
  // login does not require jwt verification
  if (req.path == pathApi) {
    // next middleware
    return next()
  }

  // get token from request header Authorization
  const token = req.headers.authorization

  // Debug print
  console.log("______________ Server PROCESSING ______________________")
  console.log(req.path)
  console.log("authorization:", token)

  // Token verification
  try {
    var decoded = jwt.verify(token, jwtSecret);
    console.log("decoded", decoded)
  } catch (err) {
    // Catch the JWT Expired or Invalid errors
    return res.status(401).json({ "msg": err.message })
  }

  // next middleware
  next()
});

// Routes
app.post(domain + pathApi, (req, res) => {
  // generate a constant token, no need to be fancy here
  const token = jwt.sign({ "username": "superuser", "password": "123456789" }, jwtSecret, { expiresIn: 60 }) // 1 min token
  // return it back
  res.json({ "token": token })
});

app.get("/api/token/ping", (req, res) => {
  // Middleware will already catch if token is invalid
  // so if he can get this far, that means token is valid
  res.json({ "msg": "all good mate" })
})

app.get("/api/ping", (req, res) => {
  // random endpoint so that the client can call something
  res.json({ "msg": "pong" })
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
