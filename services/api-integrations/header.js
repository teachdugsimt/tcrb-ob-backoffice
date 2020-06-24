import https from 'https';
const Header = (api_gw_id = null, vpc_id = null) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    requestCert: false,
  })
  let baseURL
  if (process.env.PROD === 'production') {
    baseURL = `https://${api_gw_id || "dwl8p0fxml"}-${vpc_id || "vpce-03ae60b10934425db"}.execute-api.ap-southeast-1.amazonaws.com/`
    // baseURL = 'https://infiltech.org/calculator-api/web/index.php/'
  } else {
    baseURL = `https://${api_gw_id || "dwl8p0fxml"}-${vpc_id || "vpce-03ae60b10934425db"}.execute-api.ap-southeast-1.amazonaws.com/`
    // baseURL = 'https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com/'
  }

  // https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com //otp unlock & unbinding
  // https://bfwd6dw14l.execute-api.ap-southeast-1.amazonaws.com/
  // https://10uq3tql7c.execute-api.ap-southeast-1.amazonaws.com // productLimit
  const header = {
    httpsAgent,
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'Accept': 'application/json',
      // 'Access-Control-Allow-Origin': "*",
      // 'Accept': 'text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded'
      // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      // 'Content-Type': 'application/json',
      // 'Accept': 'application/json',
      // 'x-apigw-api-id': "dwl8p0fxml",
      // "Upgrade-Insecure-Requests": "1",
    },
    timeout: 10000
  }
  return header
}
export default Header










// import https from 'https';

// const Header = (api_gw_id = null, vpc_id = null) => {
//   let baseURL
//   if (process.env.PROD === 'production') {
//     // baseURL = 'https://infiltech.org/calculator-api/web/index.php/'
//     baseURL = `https://${api_gw_id ? api_gw_id : "dwl8p0fxml"}-${vpc_id ? vpc_id : "vpce-03ae60b10934425db"}.execute-api.ap-southeast-1.amazonaws.com/`
//   } else {
//     baseURL = `https://${api_gw_id ? api_gw_id : "dwl8p0fxml"}-${vpc_id ? vpc_id : "vpce-03ae60b10934425db"}.execute-api.ap-southeast-1.amazonaws.com/`
//   }
//   const httpsAgent = new https.Agent({
//     rejectUnauthorized: false,
//     requestCert: false,
//   })
//   const header = {
//     baseURL,
//     headers: {
//       // 'Accept': 'application/json',
//       // 'Access-Control-Allow-Methods': 'GET, OPTIONS, PUT',
//       // 'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
//       // 'Access-Control-Allow-Origin': "*",
//       // "Access-Control-Allow-Credentials" : true, // Required for cookies, authorization headers with HTTPS
//       // 'Accept': 'text/plain',
//       'Content-Type': 'application/json',
//       // 'X-Amz-Date': '',
//       // 'Authorization': '',
//       // 'X-Api-Key': '',
//       // 'X-Amz-Security-Token': '',
//       // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//       // "Upgrade-Insecure-Requests": "1",
//       // "Accept-Encoding": "gzip, deflate, br",
//       // "Connection": "keep-alive",
//     },
//     // httpsAgent,
//     timeout: 10000
//   }
//   return header
// }
// export default Header
