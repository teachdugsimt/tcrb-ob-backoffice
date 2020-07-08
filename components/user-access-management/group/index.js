import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import GroupList from './group-list'
import ManageGroup from './manage-group'

const Group = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [isViewManageGroup, setIsViewManageGroup] = useState(false)

    useEffect(() => {
      if (userAccessManagementStore.nextPageIsManageGroup) {
        setIsViewManageGroup(true)
      } else {
        setIsViewManageGroup(false)
      }
    }, [userAccessManagementStore.nextPageIsManageGroup])
    return (
      isViewManageGroup ? <ManageGroup /> : <GroupList />
    )
  }))

export default Group
