import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'

import SimpleModal from '../../simple-modal'
import SimpleInput from '../../simple-input'

import { checkDefaultStatus, addKeyToDataSource } from '../../data-utility'
let roleName = null
const RoleList = inject('userAccessManagementStore')
  (observer((props) => {
    const { userAccessManagementStore } = props
    const [roleList, setRoleList] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [textOk, settextOk] = useState("Submit")
    const [textCancel, settextCancel] = useState("Cancel")
    const [modalString, setmodalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [visible, setVisible] = useState(false)
    const [editingKey, setEditingKey] = useState('')

    const [form] = Form.useForm();

    useEffect(() => {
      userAccessManagementStore.getDataRole()
    }, [])

    useEffect(() => {
      if (userAccessManagementStore.roleList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.roleList).then(result => {
          setRoleList(result)
        })
      }

    }, [userAccessManagementStore.roleList])

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

    const FormAddNewRole = () => {
      return (
        <Row>
          <Col span={10} >
            <span>
              Role Name
            </span>
          </Col>
          <Col span={14}>
            <SimpleInput onChange={(value) => roleName = value} />
          </Col>
        </Row>
      )
    }

    const openModalAddNewRole = () => {
      setModalTitle('Add new role')
      setmodalString(<FormAddNewRole />)
      setVisible(true)
    }

    const addNewRole = () => {
      //waiting call api
      setVisible(false)
      let request = {
        name: roleName
      }
      userAccessManagementStore.submitAddNewRole(request)
    }

    const submitEditRole = async (key) => {
      const row = await form.validateFields()
      const index = roleList.findIndex(item => key === item.key);
      let request = {
        newData: {
          name: row.name
        },
        currentData: roleList[index]
      }
      userAccessManagementStore.updateRole(request)
      setEditingKey('');
    }

    const deactivateRoleSelect = (record) => {
      userAccessManagementStore.submitDeleteRole(record)
    }

    const renderActionRole = (record) => {
      const editable = isEditing(record);
      if (record.status == 'ACTIVE') {
        if (record.request_status == 'APPROVE' || record.request_status == 'REJECT') {
          return editable ? (
            <span>
              <TcrbPopconfirm title="Sure to Save?" onConfirm={() => submitEditRole(record.key)}>
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
                <TcrbPopconfirm title="Sure to Deactivate?" onConfirm={() => deactivateRoleSelect(record)}>
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
    const columnRole = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
      },
      {
        title: 'Role Name',
        dataIndex: 'name',
        editable: true,
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend', 'ascend'],
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => renderActionRole(record)
      }
    ]

    const mergedColumns = columnRole.map(col => {
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
      }
    })

    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => openModalAddNewRole()} >Add Role</TcrbButton>
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
            dataSource={roleList}
            columns={mergedColumns}
            size="small"
          />
        </Form>
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onOk={() => addNewRole()}
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

export default RoleList
