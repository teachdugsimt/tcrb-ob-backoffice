import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { Divider } from 'antd'

import MenuList from './menu/menu-list'
import ManageMenu from './menu/manage-menu'
import FunctionList from './function/function-list'

const MenuAndFunction = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [isViewManageFunction, setIsViewManageFunction] = useState(false)

    useEffect(() => {
      if (userAccessManagementStore.nextPageIsManageMenu == true) {
        setIsViewManageFunction(true)
      } else {
        setIsViewManageFunction(false)
      }
    }, [userAccessManagementStore.nextPageIsManageMenu])
    const ViewAllList = () => {
      return (
        <div>
          <MenuList />
          <Divider />
          <FunctionList />
        </div>

      )
    }
    const ViewDetailSelect = () => {
      return (
        <div>
          <ManageMenu />
        </div>
      )
    }
    return (isViewManageFunction ? <ViewDetailSelect /> : <ViewAllList />)
  }
  ))
export default MenuAndFunction
