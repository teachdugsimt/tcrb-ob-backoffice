import React, { useEffect, useState } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer, Space } from 'antd'
import { inject, observer } from 'mobx-react'
import { orange, green, gold } from '@ant-design/colors';
import { TcrbButton, TcrbPopconfirm } from '../../../antd-styles/styles'
import { toJS } from 'mobx'

import SimpleModal from '../../../simple-modal'
import SimpleInput from '../../../simple-input'
import { addKeyToDataSource, checkDefaultStatus } from '../../../data-utility'
const { Option } = Select

let menuName = null
let functionOptionSelected = null

const ManageMenu =
  inject('userAccessManagementStore')
    (observer((props) => {
      const [editingKey, setEditingKey] = useState('')
      const [textOk, setTextOk] = useState("Submit")
      const [textCancel, setTextCancel] = useState("Cancel")
      const [modalString, setModalString] = useState("")
      const [modalType, setModalType] = useState('')
      const [modalTitle, setModalTitle] = useState('')
      const [visible, setVisible] = useState(false)
      const [isDisableButtonAddFunction, setIsDisableButtonAddFunction] = useState(false)
      const [showEditMenu, setShowEditMenu] = useState(false)
      const [dataSourceFunction, setDataSourceFunction] = useState([])
      const [isAddFunctionToMenu, setIsAddFunctionToMenu] = useState(false)
      const [functionOptionList, setFunctionOptionList] = useState([])

      const [form] = Form.useForm();

      const { userAccessManagementStore, t } = props
      const isEditing = record => record.key === editingKey

      useEffect(() => {
        /*  addKeyToDataSource(userAccessManagementStore.menuSelected.functions).then(result => {
           setDataSourceFunction(result)
         }) */
        userAccessManagementStore.getDataFunctionList()
        userAccessManagementStore.getDataFunctionListInMenu(userAccessManagementStore.menuSelected.id)

      }, [])

      useEffect(() => {
        if (userAccessManagementStore.functionOptionList.length >= 0) {
          addKeyToDataSource(userAccessManagementStore.functionOptionList).then(result => {
            setFunctionOptionList(result)
          })
        }

      }, [userAccessManagementStore.functionOptionList])

      useEffect(() => {
        if (userAccessManagementStore.functionListInMenu.length >= 0) {
          addKeyToDataSource(userAccessManagementStore.functionListInMenu).then(result => {
            setDataSourceFunction(result)
          })
        }
      }, [userAccessManagementStore.functionListInMenu])

      const edit = record => {
        form.setFieldsValue({
          name: '',
          status: record.status,
          ...record,
        });
        setEditingKey(record.key);
      }

      const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{
                  margin: 0
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            ) : (
                children
              )
            }
          </td>
        )
      }
      const goBackToMenuList = () => {
        userAccessManagementStore.nextPageIsManageMenu = false

      }

      const addNewFunction = () => {
        let newFunction = {
          key: dataSourceFunction.length + 1,
          name: ''
        }
        setDataSourceFunction([...dataSourceFunction, newFunction])
        edit(newFunction)
        setIsDisableButtonAddFunction(true)
      }

      const addFunction = () => {
        let request = {
          menu_id: userAccessManagementStore.menuSelected.id,
          ...functionOptionSelected
        }
        userAccessManagementStore.submitAddFunctionToMenu(request)
        // userAccessManagementStore.getDataFunctionListInMenu(userAccessManagementStore.menuSelected.id)
      }

      const selectFunctionOptionList = (value) => {
        let newSelect = functionOptionList.filter(item => item.id == value)
        functionOptionSelected = newSelect[0]
      }

      const submitEditMenuName = () => {
        let request = {
          newData: {
            name: menuName
          },
          currentData: userAccessManagementStore.menuSelected
        }
        userAccessManagementStore.updateMenu(request)
        setShowEditMenu(false)
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
              {/* <SimpleInput onChange={(value) => functionName = value} /> */}
              <Select
                onChange={(value) => selectFunctionOptionList(value)}
                style={{ width: '100%' }}
              >
                {functionOptionList.map((item, index) => <Option key={index} value={item.id}>{item.name}</Option>)}
              </Select>
            </Col>
          </Row>
        )
      }

      const openModalAddFunction = () => {
        functionOptionSelected = null
        setModalTitle('Add function to Menu')
        setModalType('confirm')
        setIsAddFunctionToMenu(true)
        setModalString(<FormAddNewMenu />)
        setVisible(true)
      }

      const openModalSubmitEditMenuName = () => {
        setModalTitle('Confirm')
        setModalType('confirm')
        setModalString(
          <div style={{ textAlign: "center" }}>
            <p>Confirm to Change Menu Name "{userAccessManagementStore.menuSelected.name}" to "{menuName}".</p>
            <p style={{ color: orange[6] }}>Your changes will take effect after being approved.</p>
          </div>
        )
        setVisible(true)
      }

      const cancelEditMenu = () => {
        setShowEditMenu(false)
      }

      const submitModal = () => {
        if (isAddFunctionToMenu == true) {
          addFunction()
          setVisible(false)
          setIsAddFunctionToMenu(false)
        } else {
          submitEditMenuName()
          setVisible(false)
        }
      }

      const deactivateFunctionSelect = (record) => {
        userAccessManagementStore.submitDeleteFunction(record)
      }

      const renderActionFunction = (record) => {
        const editable = isEditing(record);
        if (record.status == 'ACTIVE') {
          if (record.request_status == 'APPROVE' || record.request_status == 'REJECT') {
            return editable ? (
              <span>
                <TcrbPopconfirm title="Sure to Save?" onConfirm={() => submitEditFunction(record.key)}>
                  <a style={{ marginRight: 8, }}>
                    Save
                    </a>
                </TcrbPopconfirm>
                <TcrbPopconfirm title="Sure to cancel?" onConfirm={() => setEditingKey('')}>
                  <a style={{ color: '#3e3e3e' }}>Cancel</a>
                </TcrbPopconfirm>
              </span>
            ) : (
                <div style={{ textAlign: "center" }}>
                  <a disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8, color: '#FBA928' }}>
                    Edit
                    </a>
                  <TcrbPopconfirm title="Sure to Deactivate?" onConfirm={() => deactivateFunctionSelect(record)}>
                    <a style={{ color: '#FBA928' }}>Deactivate</a>
                  </TcrbPopconfirm>
                </div>
              );
          } else if (record.request_status == 'PENDING') {
            return null
          }

        } else if (status == 'INACTIVE') {
          if (record.request_status == 'PENDING') {
            return null
          }
        } else {
          return null
        }
        /* if (record.request_status === 'APPROVE') {
          return editable ? (
            <span>
              <TcrbPopconfirm title="Sure to Save?" onConfirm={() => submitEditFunction(record.key)}>
                <a style={{ marginRight: 8, }}>
                  Save
                  </a>
              </TcrbPopconfirm>
              <TcrbPopconfirm title="Sure to cancel?" onConfirm={() => setEditingKey('')}>
                <a style={{ color: '#3e3e3e' }}>Cancel</a>
              </TcrbPopconfirm>
            </span>
          ) : (
              <div style={{ textAlign: "center" }}>
                <a disabled={editingKey !== ''} onClick={() => edit(record)} style={{ marginRight: 8, color: '#FBA928' }}>
                  Edit
                  </a>
                <TcrbPopconfirm title="Sure to Deactivate?" onConfirm={() => deactivateFunctionSelect(record)}>
                  <a style={{ color: '#FBA928' }}>Deactivate</a>
                </TcrbPopconfirm>
              </div>
            );
        } else if (record.request_status === 'PENDING') {
          return null
        } else if (record.request_status === 'REJECT') {
          return null
        }
        else {
          return null
        } */
      }

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
          editable: true,
          // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
        },
        {
          title: 'Action',
          dataIndex: 'operation',
          width: '10%',
          render: (text, record) => renderActionFunction(record)
        }
      ]

      const mergedColumns = columnFunction.map(col => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: record => ({
            record,
            inputType: 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });
      return (
        <div>
          <Row gutter={[4, 24]}>
            <Col span={2}>
              <TcrbButton className="default" onClick={() => goBackToMenuList()}>Back</TcrbButton>
            </Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={5}>Menu</Col>
            <Col span={7}> {showEditMenu ?
              <SimpleInput defaultValue={userAccessManagementStore.menuSelected.name} onChange={(value) => menuName = value} /> : userAccessManagementStore.menuSelected.name
            }
            </Col>
          </Row>

          <Row justify="center" style={{ marginTop: 8 }}>
            <Col span={4}>
              {showEditMenu ?
                <Space size={8}>
                  <TcrbButton className="default" onClick={() => { cancelEditMenu() }} >Cancel</TcrbButton>
                  <TcrbButton className="primary" onClick={() => { openModalSubmitEditMenuName() }} >Submit</TcrbButton>
                </Space>
                :
                <TcrbButton className="primary" onClick={() => { setShowEditMenu(true) }} >Edit</TcrbButton>}
            </Col>
          </Row>
          <Divider />
          <Row gutter={[4, 24]}>
            <Col span={2}>
              <TcrbButton className="primary" onClick={() => openModalAddFunction()} disabled={isDisableButtonAddFunction}>Add Function</TcrbButton>
            </Col>
          </Row>
          <Row>
            <Col flex={100}>
              <Form form={form} component={false}>
                <Table
                  components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                  bordered
                  dataSource={dataSourceFunction}
                  columns={mergedColumns}
                  size="small"
                />
              </Form>
            </Col>
          </Row>
          <SimpleModal
            title={modalTitle}
            type={modalType}
            onOk={() => submitModal()}
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

export default ManageMenu
