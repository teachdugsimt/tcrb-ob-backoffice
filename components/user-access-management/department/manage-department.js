import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Button, Modal, Drawer, Space } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { inject, observer } from 'mobx-react'
import { orange, green, gold } from '@ant-design/colors';

import SimpleInput from '../../simple-input'

const ManageDepartment =
  inject('userAccessManagementStore')
    (observer((props) => {
      const [showEditDepartment, setShowEditDepartment] = useState(false)
      const [editingKey, setEditingKey] = useState('')
      const [form] = Form.useForm();

      const { userAccessManagementStore, t } = props
      const isEditing = record => record.key === editingKey

      const edit = record => {
        form.setFieldsValue({
          section: '',
          team: '',
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

      const onEditSection = () => {
        setAddSection(true)
        setModalType('')
      }

      const enableEditDepartment = () => {
        setShowEditDepartment(true)
      }

      const cancelEditDepartment = () => {
        setShowEditDepartment(false)
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

      const goBackToDepartmentList = () => {
        userAccessManagementStore.nextPageIsManageDepartment = false
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
                onChange={(value) => props.onChange(value)}
              >
                {/* {children} */}
              </Select>
            </Col>
          </Row>

        )
      }

      const renderActionSectionAndTeam = (record) => {
        const editable = isEditing(record);
        if (record.status === '1') {
          return editable ? (
            <span>
              <TcrbPopconfirm title="Sure to Save?" onConfirm={() => save(record.key)}>
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
                <TcrbPopconfirm title="Sure to Deactivate?" >
                  <a style={{ color: '#FBA928' }}>Deactivate</a>
                </TcrbPopconfirm>
              </div>
            );
        } else if (record.status === '2') {
          return null
        } else {
          return null
        }
      }

      const checkStatus = (record) => {
        if (record.status === '1') {
          return <span style={{ color: green[6] }}>Active</span>
        } else if (record.status === '2') {
          return <span style={{ color: gold[6] }}>Pending</span>
        } else {
          return null
        }
      }

      const columnSection = [
        {
          title: '',
          dataIndex: 'status',
          width: '5%',
          render: (text, record) => checkStatus(record)
        },
        {
          title: 'Section',
          dataIndex: 'section_name',
          editable: true,
          // render: (text, record) => (record.partner_code + "/" + record.partner_abbreviation)
        },
        {
          title: 'Team',
          dataIndex: 'team_name',
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
              <TcrbButton className="default" onClick={() => goBackToDepartmentList()} shape="round">Back</TcrbButton>
            </Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={4}>Department</Col>
            <Col span={6}> {showEditDepartment ?
              <SimpleInput defaultValue={userAccessManagementStore.departmentSelected.department} onChange={(e) => e} /> : userAccessManagementStore.departmentSelected.department
            }
            </Col>
          </Row>
          {showEditDepartment ? <Row gutter={[4, 24]}>
            <Col span={4}>Section / Team</Col>
            <Col span={6}>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={(value) => console.log(value)}
              >
                {/* {children} */}
              </Select>
            </Col>
          </Row> :
            null
          }

          <Row justify="center" style={{ marginTop: 8 }}>
            <Col span={4}>
              {showEditDepartment ?
                <Space size={8}>
                  <TcrbButton className="default" onClick={() => { cancelEditDepartment() }} >Cancel</TcrbButton>
                  <TcrbButton className="primary" onClick={() => { enableEditDepartment() }} >Submit</TcrbButton>
                </Space>
                :
                <TcrbButton className="primary" onClick={() => { enableEditDepartment() }} >Edit</TcrbButton>}
            </Col>
          </Row>
          <Divider />
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
                  dataSource={mockSection}
                  columns={mergedColumns}
                  size="small"
                />
              </Form>
            </Col>
          </Row>

        </div>
      )
    }))

export default ManageDepartment
