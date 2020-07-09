import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer, Space } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'
import { orange, green, gold } from '@ant-design/colors';

import SimpleInput from '../../simple-input'
import SimpleModal from '../../simple-modal'
import { addKeyToDataSource, checkDefaultStatus } from '../../data-utility';
import { toJS } from 'mobx';

let sectionList = []
let departmentName = null
let selectSectionDeactivate = {}

const ManageDepartment =
  inject('userAccessManagementStore')
    (observer((props) => {
      const [showEditDepartment, setShowEditDepartment] = useState(false)
      const [editingKey, setEditingKey] = useState('')
      const [dataSourceSection, setDataSourceSection] = useState('')
      const [title, setTitle] = useState("")
      const [textOk, setTextOk] = useState("Submit")
      const [textEdit, setTextEdit] = useState("Add Section")
      const [textCancel, setTextCancel] = useState("Cancel")
      const [modalString, setModalString] = useState("")
      const [modalType, setModalType] = useState('')
      const [visible, setVisible] = useState(false)
      const [form] = Form.useForm();

      const { userAccessManagementStore, t } = props
      const isEditing = record => record.key === editingKey

      useEffect(() => {
        addKeyToDataSource(userAccessManagementStore.departmentSelected.sections).then(result => {
          setDataSourceSection(result)
        })
      }, [])

      useEffect(() => {
        if (userAccessManagementStore.responseDeleteSection == true) {
          const newData = [...dataSourceSection]
          const sectionSelect = selectSectionDeactivate
          sectionSelect.request_status = "PENDING"
          // sectionSelect.request_status = "PENDING"
          console.log(toJS(newData))
          console.log(toJS(sectionSelect))
          const index = newData.findIndex(item => sectionSelect.key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...sectionSelect });
            setDataSourceSection(newData);
          } else {
            newData.push(sectionSelect);
            setDataSourceSection(newData);
          }
          userAccessManagementStore.responseDeleteSection = false

          // setSelectSectionDeactivate({})
        }
      }, [userAccessManagementStore.responseDeleteSection])

      const addSectionToDepartment = () => {
        const newData = [...dataSourceSection];

        let sections = []
        for (let index = 0; index < sectionList.length; index++) {
          sections.push({
            name: sectionList[index],
            request_status: 'PENDING'

          })
          newData.push(sections[index]);

        }
        //waiting call api
        addKeyToDataSource(newData).then(result => {
          setDataSourceSection(result)
        })
        setVisible(false)
      }

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

      const enableEditDepartment = () => {
        setShowEditDepartment(true)
      }

      const cancelEditDepartment = () => {
        setShowEditDepartment(false)
      }

      const cancelAddNewSection = async (key) => {
        // setDisabledButtonAddRow(false)
        let indexSection = dataSourceSection.findIndex(item => key === item.key)
        const newData = [...dataSourceSection]
        newData.splice(indexSection, 1)
        setDataSource(newData);
        setEditingKey('');
      }

      const deactivateSectionSelect = (record) => {
        console.log(toJS(record))
        userAccessManagementStore.submitDeleteSection(record)
        /* userAccessManagementStore.responseDeleteSection = false
        userAccessManagementStore.responseDeleteSection = true */
        selectSectionDeactivate = record

      }

      const goBackToDepartmentList = () => {
        userAccessManagementStore.nextPageIsManageDepartment = false
      }

      const SelectDepartment = () => {
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
                onChange={(value) => sectionList = value}
              >
                {/* {children} */}
              </Select>
            </Col>
          </Row>
        )
      }

      const openModalAddSection = () => {
        setTitle('Add Section to Department')
        setModalType('confirm')
        setModalString(
          <SelectDepartment />
        )
        setVisible(true)
      }

      const openModalSubmitEditDepartmentName = () => {
        setTitle('Confirm')
        setModalType('confirm')
        setModalString(
          <div style={{ textAlign: "center" }}>
            <p>Confirm to Change Name Department {userAccessManagementStore.departmentSelected.name} to {departmentName}.</p>
            <p style={{ color: orange[6] }}>Your changes will take effect after being approved.</p>
          </div>
        )
        setVisible(true)
      }

      const submitEditSection = async (key) => {
        // Call api to update record status
        const row = await form.validateFields();
        row.status = 'INACTIVE'
        row.request_status = 'PENDING' //waiting confirm now use call new api
        const newData = [...dataSourceSection];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setDataSourceSection(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setDataSourceSection(newData);
          setEditingKey('');
        }
        // setEditingKey('');
      }

      const addNewSection = async (key) => {
        const row = await form.validateFields();
        row.status = 'INACTIVE'
        row.request_status = 'PENDING' //waiting confirm now use call new api
        const newData = [...dataSourceSection]
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setDataSourceSection(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setDataSourceSection(newData);
          setEditingKey('');
        }
        let request = {
          name: row.name,
          department_id: userAccessManagementStore.departmentSelected.id
        }

        // console.log(row)
        userAccessManagementStore.submitAddNewSection(request)
      }

      const renderActionSectionAndTeam = (record) => {
        const editable = isEditing(record);
        if (record.request_status === 'APPROVE') {
          return editable ? (
            <span>
              <TcrbPopconfirm title="Sure to Save?" onConfirm={() => submitEditSection(record.key)}>
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
                <TcrbPopconfirm title="Sure to Deactivate?" onConfirm={() => deactivateSectionSelect(record)}>
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
          return (<div>
            <TcrbPopconfirm title={"Confirm to Add !!!"} onConfirm={() => { addNewSection(record.key) }} >
              <a>Confirm</a>
            </TcrbPopconfirm><br />
            <TcrbPopconfirm title={"Confirm to Cancel !!!"} onConfirm={() => { cancelAddNewSection(record.key) }} >
              <a>Cancel</a>
            </TcrbPopconfirm>
          </div>)
        }
      }

      const addRowProductList = () => {
        let newSection = {
          key: dataSourceSection.length + 1,
          name: ''
        }
        setDataSourceSection([...dataSourceSection, newSection])
        edit(newSection)
        // setDisabledButtonAddRow(true)
      }

      const submitEditDepartmentName = () => {
        console.log(departmentName)
        setVisible(false)
        userAccessManagementStore.departmentSelected
        let request = {
          newData: {
            name: departmentName
          },
          currentData: userAccessManagementStore.departmentSelected
        }
        userAccessManagementStore.updateDepartment(request)
        setShowEditDepartment(false)
      }

      const columnSection = [
        {
          title: '',
          dataIndex: 'status',
          width: '5%',
          render: (text, record) => checkDefaultStatus(record.status, record.request_status)
        },
        {
          title: 'Section Name',
          dataIndex: 'name',
          editable: true,
          // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
        },
        {
          title: 'Action',
          dataIndex: 'operation',
          width: '10%',
          render: (text, record) => renderActionSectionAndTeam(record)
        }
      ]

      const mergedColumns = columnSection.map(col => {
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
              <TcrbButton className="default" onClick={() => goBackToDepartmentList()}>Back</TcrbButton>
            </Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={5}>Department</Col>
            <Col span={7}> {showEditDepartment ?
              <SimpleInput defaultValue={userAccessManagementStore.departmentSelected.name} onChange={(value) => departmentName = value} /> : userAccessManagementStore.departmentSelected.name
            }
            </Col>
          </Row>

          <Row justify="center" style={{ marginTop: 8 }}>
            <Col span={4}>
              {showEditDepartment ?
                <Space size={8}>
                  <TcrbButton className="default" onClick={() => { cancelEditDepartment() }} >Cancel</TcrbButton>
                  <TcrbButton className="primary" onClick={() => { openModalSubmitEditDepartmentName() }} >Submit</TcrbButton>
                </Space>
                :
                <TcrbButton className="primary" onClick={() => { enableEditDepartment() }} >Edit</TcrbButton>}
            </Col>
          </Row>
          <Divider />
          <Row gutter={[4, 24]}>
            <Col span={2}>
              <TcrbButton className="primary" onClick={() => addRowProductList()}>Add Section</TcrbButton>
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
                  dataSource={dataSourceSection}
                  columns={mergedColumns}
                  size="small"
                />
              </Form>
            </Col>
          </Row>
          <SimpleModal
            title={title}
            type={modalType}
            onOk={() => submitEditDepartmentName()}
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

export default ManageDepartment
