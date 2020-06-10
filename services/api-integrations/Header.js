let baseURL
if (process.env.PROD === 'production') {
    baseURL = 'https://infiltech.org/calculator-api/web/index.php/'
} else {
    baseURL = 'https://infiltech.org/calculator-api/web/index.php/'
}
const Header = {
    baseURL,
    headers: {
        'Accept': 'application/json',
        // 'Accept': 'text/plain',
        // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 10000
}

export default Header