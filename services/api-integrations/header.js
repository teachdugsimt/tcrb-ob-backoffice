import https from 'https';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const Header = (api_gw_id = null, vpc_id = null) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    requestCert: false,
  })
  // let baseURL = process.env.API_ENDPOINT

  // api_gw_id = api_gw_id || process.env.APIGW_ID
  // vpc_id = vpc_id || process.env.VPC
  const apigw = api_gw_id || process.env.APIGW_ID_UAM
  const vpc = vpc_id || process.env.VPC
  // console.log(process.env.API_ENDPOINT)
  // console.log('APIGWID', apigw)
  // console.log('VPCID', vpc)

  // if (process.env.PROD === 'production') {
  //   baseURL = `https://${api_gw_id || "dwl8p0fxml"}-${vpc_id || "vpce-03ae60b10934425db"}.execute-api.ap-southeast-1.amazonaws.com/`
  //   // baseURL = 'https://infiltech.org/calculator-api/web/index.php/'
  // } else {
  //   baseURL = `https://${api_gw_id || "dwl8p0fxml"}-${vpc_id || "vpce-03ae60b10934425db"}.execute-api.ap-southeast-1.amazonaws.com/`
  //   // baseURL = 'https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com/'
  // }
  let baseURL = `https://${apigw}-${vpc}.execute-api.ap-southeast-1.amazonaws.com/`
  console.log('BASEURL', baseURL)
  // let cookies_menu
  // if(cookies.get("token")){
  //   cookies_menu = JSON.parse(JSON.stringify(cookies.get("token")))
  // } else {
  //   cookies_menu = ''
  // }

  //"https://api-dev.onlinebanking-backoffice.com/api/backoffice/v1/parameterstore"
  // https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com //otp unlock & unbinding
  // https://bfwd6dw14l.execute-api.ap-southeast-1.amazonaws.com/
  // https://10uq3tql7c.execute-api.ap-southeast-1.amazonaws.com // productLimit
  const header = {
    httpsAgent,
    baseURL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;application/json',
      'Accept': 'application/json',

      // 'Authorization': cookies_menu,
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
    timeout: 20000
  }
  return header
}
export default Header





// const unixTimestamp = Math.round(new Date().getTime()/1000.0)

// HEADER REAL API **
// -H' => x-api-key: 'key of ob : ""'
// -H' => x-api-uuidv4: 'uuidv4 + unix timestamp'
// -H' => x-api-signature: ''
      // => Partner SecretKey = s3vv9eupapo2zqwmsajl0w4vxzpielja2a0f
      // => Partner API key = bf7d557f7c3999ad7d78e53713caba6039583d3397c7035f9806b4de68e41f99
      // => UUIDv4 (32 หลัก รวม “-”) = 72276040-4bb5-4e4c-8f14-086e7f587347
      // => UUIDv4 (32 หลัก ไม่รวม “-”) + Timestamp (10 หลัก) = 722760404bb54e4c8f14086e7f5873471592213892
      // => "GET"
      // => "v1/parameterstore"


// -H' => x-api-language: 'TH'


// SPEAC REAL API **
// URL
// https://api-dev.tcrb-onlinebanking.com/api/backoffice/v1/parameterstore

//Parameter Store : "OTP_EXPIRE_TIME,OTP_MAXIMUM_ENTERED,OTP_TOKEN_EXPIRE_TIME"

// GET
// params: otpParamsField => "OTP_EXPIRE_TIME"

// POST
// params : field => OTP_EXPIRE_TIME : 50
//                => OTP_MAXIMUN_ENTERED: 3
