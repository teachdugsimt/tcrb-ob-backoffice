import { observable, action, computed } from 'mobx'
import { LoginApi } from '../services'
import { persist } from 'mobx-persist'

class LoginStore {
  @observable
  fetching_login = null

  // @observable
  // data_signin = null
  // @observable
  // data_signin = null
  @persist('object') @observable data_signin = {}
  @observable
  data_token = {}
  @observable
  data_menu = []
  @observable
  error_login = null

  @observable
  profile = null

  @observable
  fetching_logout = null
  @observable
  data_logout = null
  @observable
  error_logout = null

  @action async clearCacheLogin(type) {
    if (type == "error") {
      this.data_signin = null
    } else if (type == "success") {
      this.error_login = null
    }
  }

  @action
  async requestLogin(params) {
    this.fetching_login = true
    const tmp = await LoginApi.LoginApi(params)
    console.log(tmp)
    if (tmp && tmp.ok && tmp.status === 200 && tmp.data && tmp.data.responseData) {
      //when success
      let data = JSON.parse(JSON.stringify(tmp.data.responseData))
      this.fetching_login = false
      console.log("Response data :: ", tmp.data.responseData)
      // console.log(this.data_signin)
      let tmp_token = {
        idToken: data.idToken,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      }
      this.data_signin = tmp_token
      this.profile = data.userProfile

      this.data_menu = Object.keys(data.userProfile).length == 0 ? [] : (data.userProfile.menus && data.userProfile.menus.length > 0 ? data.userProfile.menus : [])
      this.error_login = null

    } else {
      //when error
      this.fetching_login = false
      this.error_login = tmp.data && tmp.data.responseData ? tmp.data.responseData : tmp.problem
      this.data_signin = null
    }
  }

  @action async setProfile(userProfile) {
    if (userProfile) {
      this.profile = userProfile
      if(userProfile.menus && userProfile.menus.length > 0){
        this.data_menu = userProfile.menus
      } else this.data_menu = []
    }
  }

  @computed get getMenuLogin() {
    return this.data_menu
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
