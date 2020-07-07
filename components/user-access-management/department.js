import React, { useState, useEffect } from 'react'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider } from 'antd'
import { TcrbButton, TcrbPopconfirm } from '../antd-styles/styles'
import { inject, observer } from 'mobx-react'

import SimpleModal from '../simple-modal'
import SimpleInput from '../simple-input'

import { addKeyToDataSource } from '../data-utility'

const { Option } = Select;

const Department =
  inject('UserAccessManagementStore')
    (observer((props) => {
      const { UserAccessManagementStore, t } = props
      const [title, settitle] = useState("")
      const [textOk, settextOk] = useState("Ok")
      const [textCancel, settextCancel] = useState("Cancel")
      const [modalString, setmodalString] = useState("initialState")
      const [visible, setvisible] = useState(false)
      const [mockDataDepartment, setMockDataDepartment] = useState([])

      const children = [];
      for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i} value={i}>{i.toString(36) + i}</Option>);
      }
      const mockData = [
        {
          status: '1',
          department: 'Information Technology',
          section: [{
            section_name: 'section_1',
            section_id: '01'
          },
          {
            section_name: 'section_2',
            section_id: '02'
          },
          {
            section_name: 'section_3',
            section_id: '03'
          }]
        }
      ]

      useEffect(() => {
        //cal api
        addKeyToDataSource(mockData).then(result => {
          setMockDataDepartment(result)
        })
      }, [])

      /*  const mockDataDepartment = [
         {
           status: '1',
           department: 'Information Technology',
           section: []
         }
       ] */


      const renderActionDepartment = (record) => {
        console.log(record)
        if (record.status === '1') {
          return <span>
            <TcrbPopconfirm title="Sure to Edit?" onConfirm={() => console.log('edit')}>
              <a style={{ marginRight: 8, }}>
                Edit
              </a>
            </TcrbPopconfirm>
            <TcrbPopconfirm title="Sure to Deactivate?" >
              <a style={{ color: '#3e3e3e' }}>Deactivate</a>
            </TcrbPopconfirm>
          </span>
        } else {
          return null
        }
      }

      const renderSection = (record) => {
        return <div style={{ textAlign: "center" }}>
          <a onClick={() => selectSection(record)}>{record.section.length} Section</a>
        </div>
      }
      const columnDepartment = [
        {
          title: '',
          dataIndex: 'status',
          width: '5%',
          // render: (text, record) => checkStatus(record)
        },
        {
          title: 'Department',
          dataIndex: 'department',
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
          render: (text, record) => renderActionDepartment(record)
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
                <SimpleInput onChange={(value) => console.log(value)} />
              </Col>
            </Row>
          </div>
        )
      }

      const handleChange = (value) => {
        console.log(value)
      }
      const SelectDepartment = () => {
        return (
          <Row>
            <Col span={10} style={{ padding: 4 }}>
              <p>Section / Team</p>
            </Col>
            <Col span={14}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
                onChange={(value) => handleChange(value)}
              >
                {children}
              </Select>
            </Col>
          </Row>

        )
      }

      const selectSection = () => {

      }

      const openModalAddDepartment = () => {
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
      return (
        <div>
          <Row gutter={[4, 24]}>
            <Col span={2}>
              <TcrbButton className="primary" onClick={() => openModalAddDepartment()} shape="round">Add</TcrbButton>
            </Col>
          </Row>
          <Table
            bordered
            dataSource={mockDataDepartment}
            columns={columnDepartment}
            size="small"
          />
          <SimpleModal
            title={title}
            // type={modalType}
            onOk={() => setvisible(false)}
            onCancel={() => setvisible(false)}
            textCancel={textCancel}
            textOk={textOk}
            // width={800}
            modalString={modalString}
            visible={visible}
          />

        </div>
      )
    }))

export default Department
