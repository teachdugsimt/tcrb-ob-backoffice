import { create } from 'apisauce'
import Header from './header'
import https from 'https';
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  requestCert: false,

})

const ExcuteApi = async (url, params, method, gw_id, timeout = 40000) => {
  // console.time('ExcuteApi')
  try {
    const api = create(await Header(gw_id, null,
      url.includes('signin') ? true : null,
      url.includes('upload') && method == 'put' ? true : null,
      timeout))
    let response
    if (method == "get" || method == "GET") {
      response = await api.get(url, params || { filter: {} })
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
    console.timeEnd('ExcuteApi')
    return response
  } catch (error) {
    console.timeEnd('ExcuteApi')
    return error
  }
}

export default ExcuteApi
