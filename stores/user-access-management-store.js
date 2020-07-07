import { observable, action, toJS } from 'mobx'

export default class UserAccessManagement {
  @observable apiFetching = false
  @observable responseGetDepartmentList = []
}
