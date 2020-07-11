import React, { useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import DepartmentList from './department-list'
import ManagementDepartment from './manage-department'

const Department = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [isViewManageDepartment, setIsViewManageDepartment] = useState(false)
    useEffect(() => {
      if (userAccessManagementStore.nextPageIsManageDepartment) {
        setIsViewManageDepartment(true)
      } else {
        setIsViewManageDepartment(false)
      }
    }, [userAccessManagementStore.nextPageIsManageDepartment])
    return (
      (isViewManageDepartment) ? <ManagementDepartment /> : <DepartmentList />)
  }))

export default Department
