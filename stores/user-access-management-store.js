import { observable, action, toJS } from 'mobx'
import { UserAccessManagementApi } from '../services'

export default class UserAccessManagement {
  @observable apiFetching = false
  @observable responseApiError = false

  @observable nextPageIsManageDepartment = null
  @observable nextPageIsManageGroup = null
  @observable nextPageIsManageUser = null
  @observable nextPageIsManageMenu = null
  @observable nextPageIsManageFunction = null
  @observable nextPageIsManageRole = null

  @observable departmentList = []


  @observable departmentSelected = null
  @observable groupSelected = null
  @observable userSelected = null

  @observable responseDeleteSection = null

  @action getDataDepartment = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getDepartment({ filter: { where: { status: "ACTIVE" } } })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.departmentList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action getDataDepartmentDetail = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getDepartmentDetail(params)

    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action getDataGroup = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getGroup(params)

    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action getDataGroupDetail = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getGroupDetail(params)

    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action submitAddNewDepartment = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.addNewDepartment({ change_type: "DEPARTMENTS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.departmentList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action submitAddNewSection = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.addNewDepartment({ change_type: "SECTIONS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.departmentList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action updateDepartment = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.updateDepartment({ change_type: "DEPARTMENTS", action: "Update", currentData: params.currentData, newData: params.newData, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.departmentList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action submitDeleteDepartment = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.deleteDepartment({ change_type: "DEPARTMENTS", action: "Delete", currentData: params, newData: {}, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
      this.getDataDepartment()
      this.departmentList = []
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action submitDeleteSection = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.deleteDepartment({ change_type: "SECTIONS", action: "Delete", currentData: params, newData: {}, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
      this.responseDeleteSection = true
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }
}
