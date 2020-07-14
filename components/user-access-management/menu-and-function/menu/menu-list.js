import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer } from 'antd'
import { TcrbButton, TcrbPopconfirm, TcrbModal } from '../../../antd-styles/styles'
import { inject, observer } from 'mobx-react'

import SimpleModal from '../../../simple-modal'
import SimpleInput from '../../../simple-input'

import { checkDefaultStatus, addKeyToDataSource } from '../../../data-utility'
let roleName = null

const { Option } = Select;

const MenuList = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [menuList, setMenuList] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [textOk, settextOk] = useState("Submit")
    const [textCancel, settextCancel] = useState("Cancel")
    const [modalString, setModalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [visible, setVisible] = useState(false)
    const [functionList, setFunctionList] = useState([])
    const [visibleFormAddNewMenu, setVisibleFormAddNewMenu] = useState(false)

    const [form] = Form.useForm();


    useEffect(() => {
      userAccessManagementStore.getDataMenu()
      userAccessManagementStore.getDataFunctionList()
    }, [])

    useEffect(() => {
      if (userAccessManagementStore.menuList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.menuList).then(result => {
          setMenuList(result)
        })
      }

    }, [userAccessManagementStore.menuList])

    useEffect(() => {
      if (userAccessManagementStore.functionOptionList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.functionOptionList).then(result => {
          setFunctionList(result)
        })
      }
    }, [userAccessManagementStore.functionOptionList])


    /* const FormAddNewMenu = () => {
      return (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={10} >
              <span>
                Menu Name
            </span>
            </Col>
            <Col span={14}>
              <SimpleInput onChange={(value) => roleName = value} />
            </Col>
          </Row>
          <Row >
            <Col span={10} >
              <span>
                Functions
              </span>
            </Col>
            <Col span={14}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select Functions"
                onChange={(value) => null}
              >
                {functionList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
              </Select>
            </Col>
          </Row>
        </div>

      )
    } */

    const FormAddNewDepartment = ({ visible, onCreate, onCancel }) => {
      return (
        <TcrbModal
          visible={visible}
          title="Add new menu"
          okText="Submit"
          cancelText="Cancel"
          onCancel={() => {
            form.resetFields();
            onCancel()
          }}
          width={600}
          onOk={() => {
            form
              .validateFields()
              .then(values => {
                form.resetFields();
                onCreate(values);
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          }}
          maskClosable={false}

        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
          >

            <Row >
              <Col span={10} style={{ padding: 4 }}>
                <span>
                  Menu Name
            </span>
              </Col>
              <Col span={14}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input Menu Name',
                    },
                  ]}
                >
                  <SimpleInput />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={10} style={{ padding: 4 }}>
                <p>Functions</p>
              </Col>
              <Col span={14}>
                <Form.Item
                  name="function_list_id"
                >
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select Function"
                  >
                    {functionList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TcrbModal>
      )
    }

    const openModalAddNewMenu = () => {
      setModalTitle('Add new menu')
      setModalString(<FormAddNewMenu />)
      setVisible(true)
    }

    const addNewMenu = (values) => {
      setVisibleFormAddNewMenu(false)
      let newFunctionList = []
      for (let index = 0; index < values.function_list_id.length; index++) {
        for (let indexFunction = 0; indexFunction < functionList.length; indexFunction++) {
          if (values.function_list_id[index] == functionList[indexFunction].id) {
            newFunctionList.push({
              name: functionList[indexFunction].name,
              id: values.function_list_id[index]
            })
          }
        }
      }
      // console.log(newFunctionList, values)
      let request = {
        name: values.name,
        function_list: newFunctionList
      }
      userAccessManagementStore.submitAddNewMenu(request)
    }

    const deactivateMenuSelect = (record) => {
      userAccessManagementStore.submitDeleteMenu(record)
    }

    const openModalShowFunctionList = (functionList) => {
      setModalType('')
      setModalTitle('Function ')
      addKeyToDataSource(functionList).then(result => {
        setModalString(
          <div>
            <Table
              bordered
              dataSource={result}
              columns={columnFunction}
              size="small"
              pagination={false}
            />
          </div>
        )
      })
      setVisible(true)
    }

    const renderFunction = (record) => {
      return <div>
        <a onClick={() => openModalShowFunctionList(record.functions)}>{record.functions ? record.functions.length : '-'} Function</a>
      </div>
    }

    const viewMenuManage = (record) => {
      userAccessManagementStore.menuSelected = record
      userAccessManagementStore.nextPageIsManageMenu = true
    }

    const renderActionMenu = (record) => {

      if (record.request_status == 'APPROVE') {
        return (
          <div style={{ textAlign: "center" }}>
            <a onClick={() => viewMenuManage(record)} style={{ marginRight: 8, color: '#FBA928' }}>
              Edit
                </a>
            <TcrbPopconfirm title="Sure to Deactivate?" onConfirm={() => deactivateMenuSelect(record)}>
              <a style={{ color: '#FBA928' }}>Deactivate</a>
            </TcrbPopconfirm>
          </div>
        )
      } else if (record.request_status == 'PENDING') {
        return null
      } else if (record.request_status == 'REJECT') {
        return null
      }
    }

    const columnMenu = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
      },
      {
        title: 'Name',
        dataIndex: 'name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Functions',
        dataIndex: 'functions',
        render: (text, record) => renderFunction(record)
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => renderActionMenu(record)
      }
    ]

    const columnFunction = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
      },
      {
        title: 'Function Name',
        dataIndex: 'name',
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      }
    ]
    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            {/* <TcrbButton className="primary" onClick={() => openModalAddNewMenu()} >Add Menu</TcrbButton> */}
            <TcrbButton className="primary" onClick={() => setVisibleFormAddNewMenu(true)} >Add Menu</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={menuList}
          columns={columnMenu}
          size="small"
        />
        <FormAddNewDepartment
          visible={visibleFormAddNewMenu}
          onCreate={addNewMenu}
          onCancel={() => {
            setVisibleFormAddNewMenu(false);
          }}
        />
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onOk={() => addNewMenu()}
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

export default MenuList
