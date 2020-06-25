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
      response = await api.post(url, params)
    }
    else if (method == "put" || method == "PUT") {
      response = await api.put(url, params)
    }
    else if (method == "patch" || method == "PATCH") {
      response = await api.patch(url, params)
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
