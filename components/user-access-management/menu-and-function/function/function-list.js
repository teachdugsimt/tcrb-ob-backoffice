import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../../antd-styles/styles'
import { inject, observer } from 'mobx-react'

import SimpleModal from '../../../simple-modal'
import SimpleInput from '../../../simple-input'

import { checkDefaultStatus } from '../../../data-utility'
let roleName = null
const FunctionList = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [mockFunctionList, setMockFunctionList] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [textOk, settextOk] = useState("Submit")
    const [textCancel, settextCancel] = useState("Cancel")
    const [modalString, setModalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [visible, setVisible] = useState(false)

    useEffect(() => {
      setMockFunctionList(testFunctionList())
    }, [])

    const testFunctionList = () => {
      let newArray = []
      for (let index = 1; index < 6; index++) {
        newArray.push({
          id: index,
          key: index,
          function_name: "function_" + index,
          status: '1',
        })
      }
      return newArray
    }

    const FormAddNewMenu = () => {
      return (
        <Row>
          <Col span={10} >
            <span>
              Function Name
            </span>
          </Col>
          <Col span={14}>
            <SimpleInput onChange={(value) => roleName = value} />
          </Col>
        </Row>
      )
    }

    const openModalAddFunction = () => {
      setModalTitle('Add new function')
      setModalString(<FormAddNewMenu />)
      setVisible(true)
    }

    const addNewFunction = () => {
      //waiting call api
      setVisible(false)
    }
    const columnFunction = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(text)
      },
      {
        title: 'Name',
        dataIndex: 'function_name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        // render: (text, record) => renderActionGroup(record)
      }
    ]
    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => openModalAddFunction()} >Add Function</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={mockFunctionList}
          columns={columnFunction}
          size="small"
        />
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onOk={() => addNewFunction()}
          onCancel={() => setVisible(false)}
          textCancel={textCancel}
          textOk={textOk}
          width={600}
          modalString={modalString}
          visible={visible}
        />
      </div>
    )
  }))

export default FunctionList
