import React, { useEffect, useState } from 'react'
import { Table, Select } from 'antd'
import { inject, observer } from 'mobx-react'


const { Option } = Select
const RoleBasedMatrix = inject('userAccessManagementStore')
  (observer((props) => {
    const [mockDataSourceDynamic, setMockDataSourceDynamic] = useState([])
    const [column, setColumn] = useState(null)
    const { userAccessManagementStore } = props
    const roleList = 10
    const functionList = 4
    const roleMatrix = {
      role_1: [],
      role_2: [],
      role_3: [],
      role_4: [],
      role_5: [],
      role_6: [],
    }
    let dataSource = []
    let testColumn = []

    useEffect(() => {
      addRoleToColumn()
      addFunctionToDataSource()
      userAccessManagementStore.getDataMatrix()
    }, [])
    /* const column = [
      {
        title: 'Function',
        dataIndex: 'menu_name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Functions',
        dataIndex: 'functions',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      }
    ] */

    const addRoleToColumn = () => {
      for (let index = 0; index <= roleList; index++) {
        if (index == 0) {
          testColumn.push(
            {
              title: 'Functions',
              dataIndex: 'function'
            }
          )
        } else {
          testColumn.push(
            {
              title: 'Role' + index,
              dataIndex: 'role_' + index,
              render: (text, record) => {
                return (
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue="notUse"
                    showArrow={false}>
                    <Option value="unmark"> Unmark</Option>
                    <Option value="mark">mark</Option>
                    <Option value="notUse">Not Use</Option>
                  </Select>
                )
              }
            }
          )
        }
      }
      setColumn(testColumn)
    }
    const addFunctionToDataSource = () => {
      for (let index = 0; index <= functionList; index++) {
        dataSource.push(
          {
            function: 'function_' + index,
            key: index,
            ...roleMatrix
          }
        )
      }
      console.log(dataSource)
      setMockDataSourceDynamic(dataSource)
    }

    return (
      <div>
        <Table
          columns={column}
          dataSource={mockDataSourceDynamic}
        />
      </div>
    )
  }))

export default RoleBasedMatrix
