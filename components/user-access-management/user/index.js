import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import UserList from './user-list'
import ManageUser from './manage-user'
const User = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [isViewManageUser, setIsViewManageUser] = useState(false)

    useEffect(() => {
      if (userAccessManagementStore.nextPageIsManageUser) {
        setIsViewManageUser(true)
      } else {
        setIsViewManageUser(false)
      }
    }, [userAccessManagementStore.nextPageIsManageUser])

    return (
      isViewManageUser ? <ManageUser /> : <UserList />
    )
  }))

export default User
