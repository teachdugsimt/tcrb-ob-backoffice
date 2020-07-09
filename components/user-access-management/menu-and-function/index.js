import React, { useEffect, useState } from 'react'
import MenuList from './menu/menu-list'
import FunctionList from './function/function-list'
import { inject, observer } from 'mobx-react'

import { Divider } from 'antd'
const MenuAndFunction = inject('userAccessManagementStore')
  (observer((props) => {
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

    }
    return (
      <ViewAllList />
    )
  }
  ))
export default MenuAndFunction
