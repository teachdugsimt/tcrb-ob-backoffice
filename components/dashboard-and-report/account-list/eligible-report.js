import React, { useState, useEffect } from 'react'
import { PageHeader, Collapse, Button, Row, Form, Input, Col, Select, DatePicker } from 'antd'
import { inject, observer } from 'mobx-react'

import GenerateFormAntd from '../../data-utility/generate-form-antd'
import moment from 'moment'

const { Panel } = Collapse;
const { Option } = Select
const { RangePicker } = DatePicker;

const EligibleReport =
  inject('dashboardAndReportStore')
    (observer((props) => {
      const { dashboardAndReportStore } = props
      const [testCollapse, setTestCollapse] = useState(['1'])
      const [form] = Form.useForm();

      useEffect(() => { }, [
        dashboardAndReportStore.getDataReportEligible({
          "dateFilter": "originate",
          "fromDate": "20200720",
          "toDate": "20200720",
          "fromTime": "000000",
          "toTime": "050000"
        })
      ])
      const toggleCollapse = () => {
        console.log('click')
        if (testCollapse == 1) {
          setTestCollapse(0)
        } else {
          setTestCollapse(1)
        }
      }

      const handlerChangeDropdown = () => {

      }
      const _onFinishForm = (values) => {
        const rangeValue = values['dateTime'];
        let formDate = rangeValue[0].format('YYYYMMDD')
        let fromTime = rangeValue[0].format('HH:mm:ss')
        let toDate = rangeValue[1].format('YYYYMMDD')
        let toTime = rangeValue[1].format('HH:mm:ss')

      }
      const _onFailureForm = (values) => {
        console.log(values)
      }

      const formSearchCriteria = [{
        id: 1,
        key: 1,
        section_name: "Search Criteria",
        section:
          [
            { // dropdown
              key: 1, id: 1, name: "Date Filter", placeholder: 'Please Select Date Filter.', keyword: "dateFilter",
              type: 'dropdown', mode: "single", require: true,
              onChange: handlerChangeDropdown,
              item: [
                { key: 1, name: 'Originate', value: 'originate' },
                { key: 2, name: 'SFTP', value: 'sftp' },
              ]
            },
            { // dropdown
              key: 2, id: 2, name: "Date Time", placeholder: '', keyword: "dateTime",
              type: 'date', mode: "start-end", require: true, isShowTime: true,
              onChange: handlerChangeDropdown,
            }
          ]
      },
      {
        id: 2,
        key: 2,
        section_name: "Channel Information",
        section:
          [
            {
              key: 1, id: 1, name: "Channel", placeholder: '', keyword: "channel",
              type: 'input', require: false, disabled: false,

            },
            {
              key: 2, id: 2, name: "Entity", placeholder: '', keyword: "entity",
              type: 'input', require: false, disabled: false,
            },
            {
              key: 3, id: 3, name: "Product Type", placeholder: 'Please Select Product Type.', keyword: "productType",
              type: 'dropdown', mode: "single", require: true,
              onChange: handlerChangeDropdown,
              item: [
                { key: 1, name: 'L', value: 'L' },
                { key: 2, name: 'A', value: 'A' },
              ]
            }
          ]
      }
      ]
      const FormSearchCriteria = ({ onSubmitSearchCriteria }) => {
        return (
          <Form
            form={form}
            name="form_in_collapse"
            onFinish={(values) => {
              onSubmitSearchCriteria(values)
              form.resetFields()
            }}
          >
            <Row>
              <Col span={12}>
                <p style={{ fontWeight: "bold" }}>Activity Date</p>
                <Row gutter={[4, 2]}>
                  <Col span={6} >
                    <span>
                      Date Filter
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="dateFilter"
                      rules={[
                        {
                          required: true,
                          message: 'Please Select DateFilter!!',
                        },
                      ]}
                    >
                      <Select>
                        <Option value="sftp">SFTP</Option>
                        <Option value="originate">Originate</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[4, 2]}>
                  <Col span={6} >
                    <span>
                      Date Time
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="dateTime"
                      rules={[
                        {
                          required: true,
                          message: 'Please input DateTime!',
                        },
                      ]}
                    >
                      <RangePicker
                        ranges={{
                          Today: [moment(), moment()],
                          'This Month': [moment().startOf('month'), moment().endOf('month')],
                        }}
                        showTime
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <p style={{ fontWeight: "bold" }}>Channel Information</p>
                <Row gutter={[4, 2]}>
                  <Col span={12} >
                    <span>
                      Channel
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="channel"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[4, 2]}>
                  <Col span={12} >
                    <span>
                      Entity
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="entity"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[4, 2]}>
                  <Col span={12} >
                    <span>
                      Product Type
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="product_type"
                      placeholder="Please Select Product Type !!"
                    >
                      <Select >
                        <Option value="L">L</Option>
                        <Option value="A">A</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <p style={{ fontWeight: "bold" }}>Customer / Account Information</p>
                <Row gutter={[4, 2]}>
                  <Col span={6} style={{ padding: 4 }}>
                    <span>
                      Main Account No.
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="main_account_no"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[4, 2]}>
                  <Col span={6} style={{ padding: 4 }}>
                    <span>
                      Sub Account No.
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="sub_account_no"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[4, 2]}>
                  <Col span={6} style={{ padding: 4 }}>
                    <span>
                      Customer ID
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="customer_id"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[4, 2]}>
                  <Col span={6} style={{ padding: 4 }}>
                    <span>
                      Customer Name
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="customer_name"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <p style={{ fontWeight: "bold" }}>Binding Information</p>
                <Row gutter={[4, 2]}>
                  <Col span={12}>
                    <span>
                      Binding Status
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="binding_status"
                    >
                      <Select>
                        {/* <Option></Option> */}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[4, 2]}>
                  <Col span={12} >
                    <span>
                      Binding Date
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="binding_date"
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[4, 2]}>
                  <Col span={12} >
                    <span>
                      Batch Type
                </span>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="batch_type"
                      placeholder="Please Select Batch Type !!"
                    >
                      <Select >
                        {/* <Option value="L">L</Option>
                    <Option value="A">A</Option> */}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>


            <Form.Item >
              <Button type="primary" htmlType="submit">
                Submit
        </Button>
            </Form.Item>
          </Form>
        )
      }
      return (
        <div>
          <PageHeader title="Eligible Report" />
          <Collapse defaultActiveKey={['1']} activeKey={testCollapse} onChange={() => toggleCollapse()}>
            <Panel header="Search Criteria" key="1" >
              <FormSearchCriteria />
              {/* <GenerateFormAntd
            onFinish={_onFinishForm}
            onFinishFailed={_onFailureForm}
            datasource={formSearchCriteria}
          /> */}
            </Panel>
          </Collapse>
          {/* <Button className="primary" onClick={() => toggleCollapse()} >testClick</Button> */}
        </div>
      )
    }
    ))
export default EligibleReport
