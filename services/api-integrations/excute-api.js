import { ApisauceInstance, create, ApiResponse } from 'apisauce'
import Header from './header'
import https from 'https';

const ExcuteApi = async (url, params) => {
  try {
    const api = create(Header())
    const response = await api.get(url, params)
    return response
  } catch (error) {
    return error
  }
}

export default ExcuteApi
