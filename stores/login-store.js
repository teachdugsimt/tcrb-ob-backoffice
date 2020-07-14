import { observable, action } from 'mobx'
import { LoginApi } from '../services'
import { create, persist } from 'mobx-persist'
class LoginStore {
  @observable
  fetching_login = null

  @persist @observable
  data_login = null
  @observable
  error_login = null

  @observable
  fetching_logout = null
  @observable
  data_logout = null
  @observable
  error_logout = null

  @action async clearCacheLogin(type) {
    if (type == "error") {
      this.data_login = null
    } else if (type == "success") {
      this.error_login = null
    }
  }

  @action
  async requestLogin(params) {
    this.fetching_login = true
    const tmp = await LoginApi.LoginApi(params)
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_login = false
      this.data_login = tmp.data.responseData
      this.error_login = null
    } else {
      //when error
      this.fetching_login = false
      this.error_login = tmp.data && tmp.data.responseData ? tmp.data.responseData : tmp.problem
      this.data_login = null
    }
  }

  @action
  async requestLogout(params) {
    this.fetching_logout = true
    const tmp = await LoginApi.LogoutApi(params)
    console.log(tmp)
    if (tmp.ok && tmp.status === 200 && tmp.data) {
      //when success
      this.fetching_logout = false
      this.data_logout = tmp.data.responseData
      this.error_logout = null
    } else {
      //when error
      this.fetching_logout = false
      this.error_logout = tmp.data && tmp.data.responseData ? tmp.data.responseData : tmp.problem
      this.data_logout = null
    }
  }
}
export default LoginStore
