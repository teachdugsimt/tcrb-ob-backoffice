import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './header'
import https from 'https';
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  requestCert: false,
})

const ExcuteApi = async (url, params, method) => {
  try {
    const api = create(Header())
    let response
    if (method == "get" || method == "GET") {
      response = await api.get(url, params)
    }
    else if (method == "post" || method == "POST") {


      // const header2 = {
      //   httpsAgent,
      //   baseURL: "https://dwl8p0fxml-vpce-03ae60b10934425db.execute-api.ap-southeast-1.amazonaws.com/",
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //     // 'Accept': 'application/json',
      //     // 'Access-Control-Allow-Origin': "*",
      //     // 'Accept': 'text/plain',
      //     // 'Content-Type': 'application/x-www-form-urlencoded'
      //     // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      //     // 'Content-Type': 'application/json',
      //     // 'Accept': 'application/json',
      //     // 'x-apigw-api-id': "dwl8p0fxml",
      //     // "Upgrade-Insecure-Requests": "1",
      //   },
      //   timeout: 10000
      // }
      // const api2 = create(header2)
      // response = await api2.post(url, params)




      response = await api.post(url, params)
    }
    else if (method == "put" || method == "PUT") {
      response = await api.put(url, params)
    }
    else if (method == "delete" || method == "DELETE") {
      response = await api.delete(url, params)
    }

    return response
  } catch (error) {
    return error
  }
}

export default ExcuteApi
