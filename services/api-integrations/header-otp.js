let baseURL
if (process.env.PROD === 'production') {
  baseURL = 'https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/'
} else {
  baseURL = 'https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/'
  // https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com/api/backoffice/v1/parameterstore
}
const unixTimestamp = Math.round(new Date().getTime()/1000.0)

const Header = {
  baseURL,
  headers: {
    // 'Access-Control-Allow-Origin': "*",
    // 'Accept': 'text/plain',
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // 'x-apigw-api-id': 'hgr766mso6',
    // 'x-api-key': '',
    // 'x-api-uuidv4': '',
    // 'x-api-signature': '',
    // 'x-api-language': 'TH',
  },
  timeout: 10000
}

export default Header

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
