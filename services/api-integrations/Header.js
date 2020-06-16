let baseURL
if (process.env.PROD === 'production') {
  baseURL = 'https://infiltech.org/calculator-api/web/index.php/'
} else {
  baseURL = 'https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com/'
}
// https://hgr766mso6.execute-api.ap-southeast-1.amazonaws.com
// https://bfwd6dw14l.execute-api.ap-southeast-1.amazonaws.com/
const Header = {
  baseURL,
  headers: {
    // 'Accept': 'application/json',
    // 'Access-Control-Allow-Origin': "*",
    // 'Accept': 'text/plain',
    // 'Content-Type': 'application/x-www-form-urlencoded'
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000
}

export default Header
