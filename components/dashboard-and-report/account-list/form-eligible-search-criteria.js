import React from 'react'

const FormSearchCriteria = ({ onSubmitSearchCriteria }) => {
  return (
    <div>
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

    </div>
  )
}

export default FormSearchCriteria
