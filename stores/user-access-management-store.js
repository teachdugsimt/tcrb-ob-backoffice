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
  @observable functionList = []
  @observable menuList = []
  @observable functionListInMenu = []
  @observable functionOptionList = []
  @observable groupList = []
  @observable userList = []
  @observable supervisorList = []
  @observable roleList = []
  @observable optionSectionList = []
  @observable optionGroupList = []
  @observable optionUserList = []
  @observable optionRoleList = []
  @observable dataMatrix = []

  @observable departmentSelected = null
  @observable groupSelected = null
  @observable userSelected = null
  @observable menuSelected = null

  @observable responseDeleteSection = null

  @action getDataDepartment = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getDepartment({
      filter: {
        where: {
          $or: [
            { status: "ACTIVE" },
            {
              $and: [
                { status: "INACTIVE" },
                { request_status: "PENDING" }
              ]
            }
          ]
        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.departmentList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataDepartment',
        body: tmp.originalError.message
      }
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
      this.responseErrorMessage = {
        title: 'getDataDepartmentDetail',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataGroupDetail = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getGroupDetail(params)
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.groupSelected = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataGroupDetail',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataFunction = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getFunction({
      filter: {
        where: {
          $or: [
            { status: "ACTIVE" },
            {
              $and: [
                { status: "INACTIVE" },
                { request_status: "PENDING" }
              ]
            }
          ]
        }
      },
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.functionList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataFunction',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataMenu = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getMenu({
      filter: {
        where: {
          $or: [
            { status: "ACTIVE" },
            {
              $and: [
                { status: "INACTIVE" },
                { request_status: "PENDING" },
              ]
            }
          ]
        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.menuList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataMenu',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataGroup = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getGroup({
      filter: {
        where: {
          $or: [
            { status: "ACTIVE" },
            {
              $and: [
                { status: "INACTIVE" },
                { request_status: "PENDING" },
              ]
            }
          ]
        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.groupList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataGroup',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataGroupOptionList = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getGroup({
      filter: {
        where: {
          status: "ACTIVE"
        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.optionGroupList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataGroupOptionList',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataUser = async () => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getUser({
      filter: {
        where: {
          $or: [
            { status: "ACTIVE" },
            {
              $and: [
                { status: "INACTIVE" },
                { request_status: "PENDING" },
              ]
            }
          ]
        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.userList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataUser',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataUserDetail = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getUserDetail(params)
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.userSelected = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataUserDetail',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataSupervisor = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getSupervisor({
      filter: {
        where: {
          $and: [
            { status: "ACTIVE" },
            { section_id: params },
          ]
        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.supervisorList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataSupervisor',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataFunctionList = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getFunction({
      filter: {
        where: {
          $and: [{
            status: "ACTIVE"
          }, {
            menu_id: null
          }]
        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.functionOptionList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataFunctionList',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataFunctionListInMenu = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getFunction({
      filter: {
        where: {
          $and: [{
            menu_id: params
          }, {
            $or: [
              { status: "ACTIVE" },
              {
                $and: [
                  { status: "INACTIVE" },
                  { request_status: "PENDING" },
                ]
              }
            ]
          }]
        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.functionListInMenu = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataFunctionListInMenu',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataRole = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getRole({
      filter: {
        where: {
          $or: [
            { status: "ACTIVE" },
            {
              $and: [
                { status: "INACTIVE" },
                { request_status: "PENDING" },
              ]
            }
          ]

        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.roleList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataRole',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataSectionList = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getSection({
      filter: {
        where: {
          status: "ACTIVE"
        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.optionSectionList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataSectionList',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataUserOptionList = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getUser({
      filter: {
        where: {
          status: "ACTIVE"
        }
      }
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.optionUserList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataUserOptionList',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataRoleOptionList = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getRole({
      filter: {
        where: {
          status: "ACTIVE"
        }
      },
      isSelectedGroup: true
    })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.optionRoleList = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataRoleOptionList',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action getDataMatrix = async (params) => {
    //some action
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.getMatrix()
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.dataMatrix = tmp.data.responseData
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'getDataMatrix',
        body: tmp.originalError.message
      }
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
      this.responseErrorMessage = {
        title: 'submitAddNewDepartment',
        body: tmp.originalError.message
      }
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
      this.responseErrorMessage = {
        title: 'submitAddNewSection',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitAddNewGroup = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.addNewGroup({ change_type: "GROUPS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.groupList = []
      this.apiFetching = false
      this.getDataGroup()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitAddNewGroup',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitAddNewFunction = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.addNewFunction({ change_type: "FUNCTIONS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.functionList = []
      this.apiFetching = false
      this.getDataFunction()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitAddNewFunction',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitAddNewMenu = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.addNewFunction({ change_type: "MENUS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.menuList = []
      this.apiFetching = false
      this.getDataMenu()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitAddNewMenu',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitAddNewRole = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.addNewRole({ change_type: "ROLES", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.roleList = []
      this.apiFetching = false
      this.getDataRole()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitAddNewRole',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitAddFunctionToMenu = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.addFunctionToMenu({ change_type: "FUNCTIONS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.functionList = []
      this.apiFetching = false
      this.getDataFunction()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitAddFunctionToMenu',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitAddNewUser = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.addNewUser({ change_type: "USER_PROFILES", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.userList = []
      this.apiFetching = false
      this.getDataUser()
    } else {
      //when error
      this.apiFetching = false
      this.responseApiError = true
    }
  }

  @action submitAddGroupToUser = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.addGroupToUser({ change_type: "MAP_USER_GROUPS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      // this.functionList = []
      let user_id = this.userSelected.id
      this.userSelected = {}
      this.apiFetching = false
      this.getDataUserDetail(user_id)
      // this.getDataFunction()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitAddGroupToUser',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitAddUserToGroup = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.addUserToGroup({ change_type: "MAP_USER_GROUPS", action: "Add", currentData: {}, newData: params, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      // this.functionList = []
      let group_id = this.groupSelected.id
      this.groupSelected = {}
      this.apiFetching = false
      this.getDataGroupDetail(group_id)
      // this.getDataFunction()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitAddUserToGroup',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action updateDepartment = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.updateDepartment({ change_type: "DEPARTMENTS", action: "Update", currentData: params.currentData, newData: params.newData, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'updateDepartment',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action updateSection = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.updateSection({ change_type: "SECTIONS", action: "Update", currentData: params.currentData, newData: params.newData, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'updateSection',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action updateFunction = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.updateFunction({ change_type: "FUNCTIONS", action: "Update", currentData: params.currentData, newData: params.newData, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.functionList = []
      this.apiFetching = false
      this.getDataFunction()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'updateFunction',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action updateMenu = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.updateMenu({ change_type: "MENUS", action: "Update", currentData: params.currentData, newData: params.newData, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.apiFetching = false
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'updateMenu',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action updateRole = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.updateRole({ change_type: "ROLES", action: "Update", currentData: params.currentData, newData: params.newData, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.roleList = []
      this.apiFetching = false
      this.getDataRole()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'updateRole',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action updateUser = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.updateUser({ change_type: "USER_PROFILES", action: "Update", currentData: params.currentData, newData: params.newData, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      // this.roleList = []
      this.apiFetching = false
      // this.getDataRole()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'updateUser',
        body: tmp.originalError.message
      }
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
      this.departmentList = []
      this.getDataDepartment()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitDeleteDepartment',
        body: tmp.originalError.message
      }
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
      this.responseErrorMessage = {
        title: 'submitDeleteSection',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitDeleteFunction = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.deleteFunction({ change_type: "FUNCTIONS", action: "Delete", currentData: params, newData: {}, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.functionList = []
      this.apiFetching = false
      this.getDataFunction()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitDeleteFunction',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitDeleteMenu = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.deleteMenu({ change_type: "MENUS", action: "Delete", currentData: params, newData: {}, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.menuList = []
      this.apiFetching = false
      this.getDataMenu()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitDeleteMenu',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitDeleteRole = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.deleteRole({ change_type: "ROLES", action: "Delete", currentData: params, newData: {}, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      this.roleList = []
      this.apiFetching = false
      this.getDataRole()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitDeleteRole',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitDeleteGroupInUser = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.deleteGroupInUser({ change_type: "MAP_USER_GROUPS", action: "Delete", currentData: params, newData: {}, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      let userId = this.userSelected.id
      this.userSelected = {}
      this.getDataUserDetail(userId)
      this.apiFetching = false
      // this.getDataRole()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitDeleteGroupInUser',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }

  @action submitDeleteUserInGroup = async (params) => {
    this.apiFetching = true
    let tmp = await UserAccessManagementApi.deleteUserInGroup({ change_type: "MAP_USER_GROUPS", action: "Delete", currentData: params, newData: {}, maker_id: '36' })
    console.log(tmp)
    if (tmp.ok & tmp.status === 200) {
      //when success
      let groupId = this.groupSelected.id
      this.groupSelected = {}
      this.getDataUserDetail(groupId)
      // this.roleList = []
      this.apiFetching = false
      // this.getDataRole()
    } else {
      //when error
      this.apiFetching = false
      this.responseErrorMessage = {
        title: 'submitDeleteUserInGroup',
        body: tmp.originalError.message
      }
      this.responseApiError = true
    }
  }
}
