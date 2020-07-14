import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer } from 'antd'
import { TcrbButton, TcrbPopconfirm, TcrbModal } from '../../antd-styles/styles'
import { inject, observer, useAsObservableSource } from 'mobx-react'
import { orange, green, gold } from '@ant-design/colors';

import SimpleModal from '../../simple-modal'
import SimpleInput from '../../simple-input'

import { addKeyToDataSource } from '../../data-utility'
import UserAccessManagement from '../../../stores/user-access-management-store';

const { Option } = Select;
let departmentName = null
let sectionArray = []
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
      const [visible, setVisible] = useState(false)
      const [visibleFormModal, setVisibleFormModal] = useState(false)
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

      /* useEffect(() => {
        if (userAccessManagementStore.departmentList.length >= 0) {
          addKeyToDataSource(userAccessManagementStore.departmentList).then((result) => {
            setDataSourceDepartment(result)
          })
        }
      }, [userAccessManagementStore.departmentList]) */


      const submitDeleteDepartment = (record) => {
        let indexRecordDelete = dataSourceDepartment.findIndex(item => record.key === item.key)
        const newData = [...dataSourceDepartment];
        newData[indexRecordDelete].status = '2'
        userAccessManagementStore.submitDeleteDepartment(record)
        //setDataSourceDepartment(newData) //waiting useEffect to check api success
      }

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
              <TcrbPopconfirm title="Sure to Deactivate?" onConfirm={() => submitDeleteDepartment(record)}>
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
        if (record.sections.length > 0) {
          return <a onClick={() => selectSection(record.sections)}>{record.sections.length} Section</a>
        } else {
          return <span>{record.sections.length} Section</span>
        }
        /* return <div>
          {record.sections.length > 0 && <a onClick={() => selectSection(record.sections)}>{record.sections.length} Section</a>}
          {record.sections.length < 0 && <span>{record.sections.length} Section</span>}
        </div> */
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

      const FormAddNewDepartment = ({ visible, onCreate, onCancel }) => {
        return (
          <TcrbModal
            visible={visible}
            title="Add New Department."
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
                    Department Name
              </span>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="departmentName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input Department Name',
                      },
                    ]}
                  >
                    <SimpleInput />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={10} style={{ padding: 4 }}>
                  <p>Section / Team</p>
                </Col>
                <Col span={14}>
                  <Form.Item
                    name="sectionName"
                  >
                    <Select
                      mode="tags"
                      style={{ width: '100%' }}
                      placeholder="Please select"
                    >
                      {/* {children} */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TcrbModal>
        )
      }

      const viewDepartmentDetail = (record) => {
        userAccessManagementStore.departmentSelected = record
        userAccessManagementStore.nextPageIsManageDepartment = true
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
        setVisible(true)
      }

      const openModalAddDepartment = () => {
        setVisibleFormModal(true)
      }

      const confirmDepartmentSelected = () => {

      }

      const addNewDepartment = (values) => {
        let sections = []
        for (let index = 0; index < values.sectionName.length; index++) {
          sections.push({
            name: values.sectionName[index]
          })
        }
        let request = {
          name: values.departmentName,
          sections: sections
        }
        userAccessManagementStore.submitAddNewDepartment(request)
        setVisibleFormModal(false)
        console.log(request)
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
            onCancel={() => setVisible(false)}
            onEdit={() => onEditSection()}
            textCancel={textCancel}
            textOk={textOk}
            textEdit={textEdit}
            width={600}
            modalString={modalString}
            visible={visible}
          />
          <FormAddNewDepartment
            visible={visibleFormModal}
            onCreate={addNewDepartment}
            onCancel={() => {
              setVisibleFormModal(false);
            }}
          />
        </div>
      )
    }))

export default DepartmentList
