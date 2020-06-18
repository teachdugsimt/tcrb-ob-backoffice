// const https = require('https')
import https from 'https';

const Header = (apigw_id = null) => {
  let baseURL
  if (process.env.PROD === 'production') {
    // baseURL = "https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com/"
    baseURL = "https://api-dev.onlinebanking-backoffice.com/"
    // baseURL = apigw_id ?
    //   "https://" + apigw_id + ".execute-api.ap-southeast-1.amazonaws.com/" :
    //   'https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/'
  } else {
    // baseURL = "https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com/"
    baseURL = "https://api-dev.onlinebanking-backoffice.com/"
    // baseURL = apigw_id ?
    //   "https://" + apigw_id + ".execute-api.ap-southeast-1.amazonaws.com/" :
    //   'https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/'
  }
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    requestCert: false,
  })
  // https.globalAgent.options.rejectUnauthorized = false
  const header = {
    baseURL,
    headers: {
      // 'Access-Control-Allow-Origin': "*",
      // 'Content-Type': 'application/json;charset=utf-8',
      // httpsAgent,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': '',
      'uuid': 'YYYYYYYY',
      'x-apigw-api-id': apigw_id ? apigw_id : "dwl8p0fxml"
    },
    httpsAgent,
    timeout: 10000
  }
  return header
}
export default Header


// group screen : business-parameter-setup-api
// 1. get parameter store (otp) : https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/parameterstore
// 2. put parameter store (otp) : https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/parameterstore
// 3. get partner transaction limit : https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/partnertransactionlimit

// group screen : customer-services-menu-api
// 1. get otp blacklist : https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/otp/blacklist
// 2. get accounts : https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/accounts
// 3. get accounts partner-info : https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/accounts/partner-info
// 4. *(wait fix problem)* post otp unlock : https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/otp/unlock
// 5. *(wait fix problem)* post accounts unbinding : https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/accounts/unbind

// group ?? : ??
// 1. get product : https://dwl8p0fxml.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/product
















// let baseURL
// if (process.env.PROD === 'production') {
//   baseURL = 'https://infiltech.org/calculator-api/web/index.php/'
// } else {
//   baseURL = 'https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com/'
// }
// // https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com //otp unlock & unbinding
// // https://bfwd6dw14l.execute-api.ap-southeast-1.amazonaws.com/
// // https://10uq3tql7c.execute-api.ap-southeast-1.amazonaws.com // productLimit
// const Header = {
//   baseURL,
//   headers: {
//     // 'Accept': 'application/json',
//     // 'Access-Control-Allow-Origin': "*",
//     // 'Accept': 'text/plain',
//     // 'Content-Type': 'application/x-www-form-urlencoded'
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   timeout: 10000
// }

// export default Header
