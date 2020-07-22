import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../../antd-styles/styles'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import SimpleModal from '../../../simple-modal'
import SimpleInput from '../../../simple-input'

import { checkDefaultStatus, addKeyToDataSource } from '../../../data-utility'
let functionName = null
let api_endpoint = null
const FunctionList = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [functionList, setFunctionList] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [textOk, settextOk] = useState("Submit")
    const [textCancel, settextCancel] = useState("Cancel")
    const [modalString, setModalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [visible, setVisible] = useState(false)
    const [editingKey, setEditingKey] = useState('')

    const [form] = Form.useForm();

    useEffect(() => {
      // setMockFunctionList(testFunctionList())
      userAccessManagementStore.getDataFunction()
    }, [])

    useEffect(() => {
      if (userAccessManagementStore.functionList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.functionList).then(result => {
          setFunctionList(result)
        })
      }

    }, [userAccessManagementStore.functionList])

    const isEditing = record => record.key === editingKey
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

    const FormAddNewMenu = () => {
      return (
        <div>
          <Row gutter={[4, 8]}>
            <Col span={10} >
              <span>
                Function Name
            </span>
            </Col>
            <Col span={14}>
              <SimpleInput onChange={(value) => functionName = value} />
            </Col>
          </Row>
          <Row gutter={[4, 8]}>
            <Col span={10} >
              <span>
                Api Endpoint
            </span>
            </Col>
            <Col span={14}>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Please Enter API Endpoint"
                onChange={(value) => api_endpoint = value}
              ></Select>
            </Col>
          </Row>
        </div>
      )
    }

    const openModalAddFunction = () => {
      setModalTitle('Add new function')
      setModalString(<FormAddNewMenu />)
      setVisible(true)
    }

    const addNewFunction = () => {
      let request = {
        name: functionName,
        api_endpoint: api_endpoint
      }
      userAccessManagementStore.submitAddNewFunction(request)
      setVisible(false)
    }

    const submitEditFunction = async (key) => {
      const row = await form.validateFields()
      const index = functionList.findIndex(item => key === item.key);
      let request = {
        newData: {
          name: row.name
        },
        currentData: functionList[index]
      }
      userAccessManagementStore.updateFunction(request)
      setEditingKey('');
    }

    const deactivateFunctionSelect = (record) => {
      userAccessManagementStore.submitDeleteFunction(record)
    }

    const renderActionGroup = (record) => {
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
    }

    const columnFunction = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
      },
      {
        title: 'Name',
        dataIndex: 'name',
        editable: true,
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => renderActionGroup(record)
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
            <TcrbButton className="primary" onClick={() => openModalAddFunction()} >Add Function</TcrbButton>
          </Col>
        </Row>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={functionList}
            columns={mergedColumns}
            size="small"
          />
        </Form>
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
