import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'
import { orange, green, gold } from '@ant-design/colors';

import SimpleModal from '../../simple-modal'
import SimpleInput from '../../simple-input'

import { addKeyToDataSource } from '../../data-utility'
import UserAccessManagement from '../../../stores/user-access-management-store';

const { Option } = Select;
let departmentName = null
let sectionArray = null
const DepartmentList =
  inject('userAccessManagementStore')
    (observer((props) => {
      const { userAccessManagementStore, t } = props
      const [title, settitle] = useState("")
      const [textOk, settextOk] = useState("Submit")
      const [textEdit, setTextEdit] = useState("Add Section")
      const [textCancel, settextCancel] = useState("Cancel")
      const [modalString, setmodalString] = useState("")
      const [modalType, setModalType] = useState('')
      const [visible, setvisible] = useState(false)
      const [visibleSection, setVisibleSection] = useState(false)
      const [dataSourceDepartment, setDataSourceDepartment] = useState([])
      const [addSection, setAddSection] = useState(false)
      const [editingKey, setEditingKey] = useState('')
      const [dataSourceSection, setDataSourceSection] = useState([])
      const [editingKeySection, setEditingKeySection] = useState('')
      const [form] = Form.useForm();


      const isEditing = record => record.key === editingKey


      useEffect(() => {
        userAccessManagementStore.getDataDepartment()
      }, [])

      useEffect(() => {
        if (userAccessManagementStore.departmentList.length >= 0) {
          addKeyToDataSource(userAccessManagementStore.departmentList).then((result) => {
            setDataSourceDepartment(result)
          })
        }
      }, [userAccessManagementStore.departmentList])

      const children = [];
      for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i} value={i}>Section_{i}</Option>);
      }

      const mockSection = [{
        section_name: 'section_1',
        team_name: 'team_1',
        section_id: '01',
        status: '1',
        key: 1
      },
      {
        section_name: 'section_2',
        team_name: 'team_2',
        section_id: '02',
        status: '1',
        key: 2
      },
      {
        section_name: 'section_3',
        team_name: 'team_3',
        section_id: '03',
        status: '1',
        key: 3
      }]

      const save = async key => {
        const row = await form.validateFields();
        const newData = [...mockDataDepartment];
        const index = newData.findIndex(item => key === item.key);

        //waiting for call api
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setDataSourceDepartment(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setDataSourceDepartment(newData);
          setEditingKey('');
        }
        //config request api
        /*  let request = {
           currentData: item,
           newData: { ...item, ...row }
         } */
        // setEditingKey('');
      }

      const renderActionDepartment = (record) => {
        if (record.request_status == 'APPROVE') {
          return (
            <div style={{ textAlign: "center" }}>
              {/* <TcrbPopconfirm title="Sure to Edit?" onConfirm={() => edit(record)}> */}
              <a disabled={editingKey !== ''} onClick={() => viewDepartmentDetail(record)} style={{ marginRight: 8, color: '#FBA928' }}>
                Edit
              </a>
              {/* </TcrbPopconfirm> */}
              <TcrbPopconfirm title="Sure to Deactivate?" >
                <a style={{ color: '#FBA928' }}>Deactivate</a>
              </TcrbPopconfirm>
              {/* <TcrbPopconfirm title="Sure to Delete?" disabled={editingKey !== ''} onConfirm={() => deletePartnerSelect(record)}>
                  <a><DeleteOutlined style={{ fontSize: '18px', paddingRight: 8 }} /></a>
                </TcrbPopconfirm>
                <a disabled={editingKey !== ''} onClick={() => edit(record)}><EditOutlined style={{ fontSize: '18px', color: '#FBA928' }} /></a> */}
            </div>
          )
        } else if (record.request_status == 'PENDING') {
          return null
        } else {
          return null
        }
      }

      const renderSection = (record) => {
        return <div>
          <a onClick={() => selectSection(record.sections)}>{record.sections.length} Section</a>
        </div>
      }

      const checkStatus = (record) => {
        //PENDING,APPROVE,REJECT
        if (record.request_status == 'APPROVE') {
          return <span style={{ color: green[6] }}>Active</span>
        } else if (record.request_status == 'PENDING') {
          return <span style={{ color: gold[6] }}>Pending</span>
        } else {
          return null
        }
      }

      const columnDepartment = [
        {
          title: '',
          dataIndex: 'status',
          width: '5%',
          render: (text, record) => checkStatus(record)
        },
        {
          title: 'Department',
          dataIndex: 'name',
          editable: true,
          // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
        },
        {
          title: 'Section / Team',
          dataIndex: 'section',
          render: (text, record) => renderSection(record)
        },
        {
          title: 'Action',
          dataIndex: 'operation',
          width: '10%',
          render: (text, record) => renderActionDepartment(record)
        }
      ]

      const columnSection = [
        {
          title: '',
          dataIndex: 'status',
          width: '5%',
          render: (text, record) => checkStatus(record)
        },
        {
          title: 'Section',
          dataIndex: 'name',
          // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
        }
      ]

      const AddDepartment = () => {
        return (
          <div>
            <Row>
              <Col span={10} style={{ padding: 4 }}>
                <p>
                  Department Name
            </p>
              </Col>
              <Col span={14}>
                <SimpleInput onChange={(value) => departmentName = value} />
              </Col>
            </Row>
          </div>
        )
      }

      const handleChange = (value) => {
        console.log(value)
        sectionArray = value
      }


      const SelectDepartment = (props) => {
        return (
          <Row>
            <Col span={10} style={{ padding: 4 }}>
              <p>Section / Team</p>
            </Col>
            <Col span={14}>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={(value) => handleChange(value)}
              >
                {/* {children} */}
              </Select>
            </Col>
          </Row>

        )
      }

      const viewDepartmentDetail = (record) => {
        userAccessManagementStore.departmentSelected = record
        userAccessManagementStore.nextPageIsManageDepartment = true
      }

      const ListSection = () => {
        return (
          <div>
            <Row>
              <Col flex={100}>

                <Table
                  bordered
                  dataSource={dataSourceSection}
                  columns={columnSection}
                  size="small"
                />
              </Col>
            </Row>
          </div>
        )
      }

      const selectSection = (section) => {
        setModalType('')
        settitle('Section and Team')
        addKeyToDataSource(section).then(result => {
          setmodalString(
            <div>
              <Table
                bordered
                dataSource={result}
                columns={columnSection}
                size="small"
              />
            </div>
          )
        })
        setvisible(true)
      }

      const openModalAddDepartment = () => {
        setModalType('confirm')
        settitle('Add New Department')
        setmodalString(
          <div>
            <AddDepartment />
            <SelectDepartment />
          </div>
        )
        setvisible(true)
      }

      const confirmDepartmentSelected = () => {

      }

      const addNewDepartment = () => {
        setvisible(false)
        console.log(departmentName, sectionArray)
      }

      return (
        <div>
          <Row gutter={[4, 24]}>
            <Col span={2}>
              <TcrbButton className="primary" onClick={() => openModalAddDepartment()} >Add Department</TcrbButton>
            </Col>
          </Row>
          <Table
            bordered
            dataSource={dataSourceDepartment}
            columns={columnDepartment}
            size="small"
          />
          <SimpleModal
            title={title}
            type={modalType}
            onOk={() => addNewDepartment()}
            onCancel={() => setvisible(false)}
            onEdit={() => onEditSection()}
            textCancel={textCancel}
            textOk={textOk}
            textEdit={textEdit}
            width={600}
            modalString={modalString}
            visible={visible}
          />
        </div>
      )
    }))

export default DepartmentList
