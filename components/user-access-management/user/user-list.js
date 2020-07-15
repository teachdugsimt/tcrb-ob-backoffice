import React, { useState, useEffect, useMemo, memo } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, InputNumber, Divider, Button, Modal, Drawer, Form, DatePicker, Space } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'
import moment from 'moment';

import { checkDefaultStatus, addKeyToDataSource } from '../../data-utility'
import SimpleInput from '../../simple-input'
import SimpleModal from '../../simple-modal'
import FormModalUser from './form-modal-user';
import { toJS } from 'mobx';

const { Option } = Select;

const UserList = inject('userAccessManagementStore')
  (observer((props) => {
    const [visible, setVisible] = useState(false)
    const [userList, setUserList] = useState([])
    const [testSupervisor, setTestSupervisor] = useState([])
    const [modalTitle, setModalTitle] = useState("")
    const [textCancel, setTextCancel] = useState("Cancel")
    const [modalString, setModalString] = useState("")
    const [modalType, setModalType] = useState('confirm')
    const [modalFromVisible, setModalFromVisible] = useState(false)
    const [form] = Form.useForm();
    const { userAccessManagementStore } = props
    const dateFormat = 'YYYY-MM-DD'

    useEffect(() => {
      userAccessManagementStore.getDataUser()
    }, [])

    useEffect(() => {
      if (userAccessManagementStore.userList.length >= 0) {
        addKeyToDataSource(userAccessManagementStore.userList).then(result => {
          setUserList(result)
        })
      }
    }, [userAccessManagementStore.userList])

    const testAddSupervisor = (id) => {
      setTestSupervisor([
        { id: 0, name: 'sup_1' },
        { id: 1, name: 'sup_2' },
        { id: 2, name: 'sup_3' },
        { id: 3, name: 'sup_4' },
        { id: 4, name: 'sup_5' },

      ])
    }

    const onCreate = values => {
      let request = {
        ...values,
        full_name: values.name + " " + values.surname,
        join_date: moment(values.join_data).format('YYYY-MM-DD'),
        last_working_date: values.last_working_date == undefined ? values.last_working_date : moment(values.last_working_date).format('YYYY-MM-DD')
      }
      // console.log(request)
      userAccessManagementStore.submitAddNewUser(request)
      setModalFromVisible(false);
    }

    const viewUserDetail = (record) => {
      userAccessManagementStore.userSelected = record
      userAccessManagementStore.nextPageIsManageUser = true
    }

    const selectGroup = (record) => {
      console.log(toJS(record))
      let newUserObject = []
      let groupList = record.map_user_groups.length
      for (let index = 0; index < groupList; index++) {
        newUserObject.push({
          name: record.map_user_groups[index].group.name,
          ...record.map_user_groups[index]
        })
      }
      setModalType('')
      setModalTitle('Group in User')

      addKeyToDataSource(newUserObject).then(result => {
        setModalString(
          <div>
            <Table
              bordered
              dataSource={result}
              columns={columnGroup}
              size="small"
            />
          </div>
        )
      })
      setVisible(true)
    }

    const renderActionUser = (record) => {
      if (record.request_status == 'APPROVE') {
        return (
          <div style={{ textAlign: "center" }}>
            <a onClick={() => viewUserDetail(record)} style={{ marginRight: 8, color: '#FBA928' }}>
              Edit
          </a>
            <TcrbPopconfirm title="Sure to Deactivate?" >
              <a style={{ color: '#FBA928' }}>Deactivate</a>
            </TcrbPopconfirm>
          </div>
        )
      } else if (record.request_status == 'PENDING') {
        return null
      } else {
        return null
      }
    }

    const renderGroup = (record) => {
      // console.log(toJS(record.map_user_groups.length))
      let lengthGroup = record.map_user_groups.length
      if (record.map_user_groups.length <= 0) {
        return (
          <span>0 Groups</span>
        )
      } else {
        return (
          <div>
            <a onClick={() => selectGroup(record)}>{record.map_user_groups.length} Groups</a>
          </div>
        )
      }
    }

    const columnUser = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
      },
      {
        title: 'Username',
        dataIndex: 'username',
        editable: true,
        // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
      },
      {
        title: 'Name',
        dataIndex: 'name',
        // render: (text, record) => renderSection(record)
      },
      {
        title: 'Surname',
        dataIndex: 'surname',
        // render: (text, record) => renderSection(record)
      },
      {
        title: 'Supervisor',
        dataIndex: 'supervisor',
        // render: (text, record) => renderSection(record)
      },
      {
        title: 'Department',
        dataIndex: 'department',
        // render: (text, record) => renderSection(record)
      },
      {
        title: 'Groups',
        dataIndex: 'map_user_groups',
        render: (text, record) => renderGroup(record)
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: '10%',
        render: (text, record) => renderActionUser(record)
      }
    ]

    const columnGroup = [
      {
        title: '',
        dataIndex: 'status',
        width: '5%',
        render: (text, record) => checkDefaultStatus(record.status, record.request_status)
      },
      {
        title: 'Group name',
        dataIndex: 'name',
        render: (text, record) => record.name
      }
    ]


    return (
      <div>
        <Row gutter={[4, 24]}>
          <Col span={2}>
            <TcrbButton className="primary" onClick={() => setModalFromVisible(true)} >Add User</TcrbButton>
          </Col>
        </Row>
        <Table
          bordered
          dataSource={userList}
          columns={columnUser}
          size="small"
        />
        {/* <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        /> */}
        <FormModalUser
          visible={modalFromVisible}
          onCreate={onCreate}
          onCancel={() => {
            setModalFromVisible(false);
          }}
        />
        <SimpleModal
          title={modalTitle}
          type={modalType}
          onCancel={() => setVisible(false)}
          textCancel={textCancel}
          width={600}
          modalString={modalString}
          visible={visible}
        />
        {/* <MemoModalCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
          testSupervisor={testSupervisor}
        /> */}
      </div>
    )
  }))

export default UserList
