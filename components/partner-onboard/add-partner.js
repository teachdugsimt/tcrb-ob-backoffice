import React, { useState } from 'react'
import { Row, Col, Button, Upload, Input, Modal, Form, Menu, Dropdown, Table, Tag, Space, message, Select } from 'antd'
import { useFormik, Formik } from 'formik'
import { DownOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons'
import { PageHeader } from '../page-header'
import { withTranslation } from '../../i18n'
import SimpleInput from '../simple-input'

const AddPartner = () => {

  const [subDistrict, setSubDistrict] = useState('')
  const [District, setDistrict] = useState('')
  const [Province, setProvince] = useState('')
  const { Option } = Select;


  const onFinish = values => {
    values.subDistrict = subDistrict
    values.District = District
    values.Province = Province
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    errorInfo.values.subDistrict = subDistrict
    errorInfo.values.District = District
    errorInfo.values.Province = Province
    console.log('Failed:', errorInfo);
  };

  const _changeSubDistrict = (value) => {
    console.log(value)
    setSubDistrict(value)
  };

  const _changeDistrict = (value) => {
    console.log(value)
    setDistrict(value)
  };

  const _changeProvince = (value) => {
    console.log(value)
    setProvince(value)
  };



  const props = () => {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange = ({ file, fileList }) => {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
        }
      }
  }

  return (
    <div >
      <PageHeader>Partner Registration</PageHeader>
      {/* <Row> */}
      <Form
        name="basic"
        initialValues={{
          parentAssignName: '',
          partnerAssignName: '',
          registerAppName: '',
          assignName: '',
          registeredApplicationName: '',
          juristicID: '',
          partnerContactEmail: '',
          partnerContactMobileNo: '',
          partnerContactName: '',
          juristicName_th: '',
          juristicName_en: '',
          status: '',
          houseNo: '',
          moo: '',
          soi: '',
          road: '',
          subDistrict: '',
          district: '',
          province: '',
          zipcode: '',

        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col span={3}>
            <div style={{ display: "flex", flexDirection: 'row' }}>
              <div>Parent Assign Name </div>
              <div style={{ color: 'red' }}>* </div>
            </div>
          </Col>
          <Col span={6}>
            <Form.Item
              name="parentAssignName"
              rules={[{ required: true, message: 'Please input your Parent Assign Name !' }]}
            >
              <Input placeholder="Parent Assign Name" style={{ width: 280 }} />
            </Form.Item>
          </Col>

          <Col span={3}>
            <div style={{ display: "flex", flexDirection: 'row' }}>
              <div>Partner Assign Name </div>
              <div style={{ color: 'red' }}>* </div>
            </div>
          </Col>
          <Col span={6}>
            <Form.Item
              name="partnerAssignName"
              rules={[{ required: true, message: 'Please input your Partner Assign Name !' }]}
            >
              <Input placeholder="Partner Assign Name" style={{ width: 280 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row >
          <Col span={3}>
            <div style={{ display: "flex", flexDirection: 'row' }}>
              <div>Juristic ID </div>
              <div style={{ color: 'red' }}>* </div>
            </div>
          </Col>
          <Col span={6}>
            <Form.Item
              name="juristicID"
              rules={[{ required: true, message: 'Please input your Juristic ID !' }]}
            >
              <Input placeholder="Juristic ID" style={{ width: 280 }} />
            </Form.Item>
          </Col>

          <Col span={3}>
            <div style={{ display: "flex", flexDirection: 'row' }}>
              <div>Juristic Name(TH)</div>
              <div style={{ color: 'red' }}>* </div>
            </div>
          </Col>
          <Col span={6}>
            <Form.Item

              name="JuristicName_th"
              rules={[{ required: true, message: 'Please input your Juristic Name(TH)!' }]}
            >
              <Input placeholder="Juristic Name(TH)" style={{ width: 280 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row >
          <Col span={3}>
            <div style={{ display: "flex", flexDirection: 'row' }}>
              <div>Juristic Name(En) </div>
              <div style={{ color: 'red' }}>* </div>
            </div>
          </Col>
          <Col span={6}>
            <Form.Item
              name="juristicName_en"
              rules={[{ required: true, message: 'Please input your Juristic Name(En)!' }]}
            >
              <Input placeholder="Juristic Name(En)" style={{ width: 280 }} />
            </Form.Item>
          </Col>

          <Col span={3}>
            <div style={{ display: "flex", flexDirection: 'row' }}>
              <div>Register App Name </div>
              <div style={{ color: 'red' }}>* </div>
            </div>
          </Col>
          <Col span={6}>
            <Form.Item
              name="registerAppName"
              rules={[{ required: true, message: 'Please input your Register App Name !' }]}
            >
              <Input placeholder="Register App Name" style={{ width: 280 }} />
            </Form.Item>
          </Col>
        </Row>

        {/* ======================={Address}======================= */}
        <Row>
          <Col span={3}>
            <div>Address </div>
          </Col>
          <Col span={4}>
            <Form.Item
              name="houseNo"
            >
              <Input placeholder="House No." style={{ width: 180 }} />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              name="moo"
            >
              <Input placeholder="Moo" style={{ width: 180 }} />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              name="soi"
            >
              <Input placeholder="Soi" style={{ width: 180 }} />
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item
              name="road"
            >
              <Input placeholder="Road" style={{ width: 180 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={3}>
            {/* <div>Address </div> */}
          </Col>
          <Col span={4}>
            <Form.Item
              name="subDistrict"
            >
              <Select defaultValue="lucy" style={{ width: 180 }} onChange={_changeSubDistrict}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="district"
            >
              <Select defaultValue="lucy" style={{ width: 180 }} onChange={_changeDistrict}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>

            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="province"
            >
              <Select defaultValue="lucy" style={{ width: 180 }} onChange={_changeProvince}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>

            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              name="zipcode"
            >
              <Input placeholder="ZipCode" style={{ width: 180 }} />
            </Form.Item>
          </Col>
        </Row>
        {/* ======================={Address}======================= */}
        {/* ======================={Attachment Files}======================= */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 16, color: '#828282' }}>Attachment Files</div>
          <div style={{ fontSize: 14, color: '#E5E5E5' }}>Only PDF support and the maximum file size is 500 MB</div>
        </div>
        <Row style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10, paddingBottom: 10 }}>
          <Col span={4} style={{ padding: 10 }} >
            <div>NDA </div>
          </Col>
          <Col span={4} style={{ padding: 10 }}>
            <Upload {...props}>
              <Button style={{ backgroundColor: 'white', color: '#595959' }}>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
          </Col>
          <Col span={4} style={{ padding: 10 }}>
            <div>{'Contract ' + '&' + ' MOU'} </div>
          </Col>
          <Col span={4} style={{ padding: 10 }}>
            <Upload {...props}>
              <Button style={{ backgroundColor: 'white', color: '#595959' }}>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
          </Col>
          <Col span={4} style={{ padding: 10 }}>
            <div>{'Company ' + '&' + ' Authorized Person Docs'}</div>
          </Col>
          <Col span={4} style={{ padding: 10 }}>
            <Upload {...props}>
              <Button style={{ backgroundColor: 'white', color: '#595959' }}>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
          </Col>
          <Col span={4} style={{ padding: 10 }}>
            <div>Vendor Valuation</div>
          </Col>
          <Col span={4} style={{ padding: 10 }}>
            <Upload {...props}>
              <Button style={{ backgroundColor: 'white', color: '#595959' }}>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
          </Col>
          <Col span={4} style={{ padding: 10 }}>
            <div>Others </div>
          </Col>
          <Col span={4} style={{ padding: 10 }}>
            <Upload {...props}>
              <Button style={{ backgroundColor: 'white', color: '#595959' }}>
                <UploadOutlined /> Upload
              </Button>
            </Upload>
          </Col>

        </Row >
        {/* ======================={Attachment Files}======================= */}
        {/* ======================={RM Contact Info}======================= */}
        <div style={{ fontSize: 16, color: '#828282', marginTop: 10 }}>RM Contact Info</div>
        <div style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10 }}>
          <Row >
            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Name - Surname </div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="name_surname"
                rules={[{ required: true, message: 'Please input your Name - Surname !' }]}
              >
                <Input placeholder="Name - Surname" style={{ width: 280 }} />
              </Form.Item>
            </Col>

            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Employee ID</div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="employeeID"
                rules={[{ required: true, message: 'Please input your Employee ID!' }]}
              >
                <Input placeholder="Employee ID" style={{ width: 280 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row >
            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Department</div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="department"
                rules={[{ required: true, message: 'Please input your Department!' }]}
              >
                <Input placeholder="Department" style={{ width: 280 }} />
              </Form.Item>
            </Col>

            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Office Phone No.</div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item

                name="officePhoneNo"
                rules={[{ required: true, message: 'Please input your Office Phone No!' }]}
              >
                <Input placeholder="Office Phone No" style={{ width: 280 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Mobile No.</div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="mobileNo"
                rules={[{ required: true, message: 'Please input your Mobile No.' }]}
              >
                <Input placeholder="JMobile No." style={{ width: 280 }} />
              </Form.Item>
            </Col>

            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Work Email </div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="workEmail"
                rules={[{ required: true, message: 'Please input your Work Email !' }]}
              >
                <Input placeholder="Work Email" style={{ width: 280 }} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        {/* ======================={RM Contact Info}======================= */}
        {/* ======================={Partner Contact Info}======================= */}
        <div style={{ fontSize: 16, color: '#828282', marginTop: 10 }}>Partner Contact Info</div>
        <div style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10 }}>
          <Row >
            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Name - Surname</div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="name_surname_partner_contact"
                rules={[{ required: true, message: 'Please input your Name - Surname !' }]}
              >
                <Input placeholder="Name - Surname" style={{ width: 280 }} />
              </Form.Item>
            </Col>

            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>ID Card No. </div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="idCardNo."
                rules={[{ required: true, message: 'Please input your ID Card No. !' }]}
              >
                <Input placeholder="ID Card No." style={{ width: 280 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row >
            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Office Phone No. </div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="officePhoneNo_partner_contact"
                rules={[{ required: true, message: 'Please input your Office Phone No. !' }]}
              >
                <Input placeholder="Office Phone No." style={{ width: 280 }} />
              </Form.Item>
            </Col>

            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Mobile No.</div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="mobileNo_partner_contact"
                rules={[{ required: true, message: 'Please input your Mobile No.!' }]}
              >
                <Input placeholder="Mobile No." style={{ width: 280 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Work Email </div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="work_email_partner_contact"
                rules={[{ required: true, message: 'Please input your Work Email!' }]}
              >
                <Input placeholder="Work Email" style={{ width: 280 }} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        {/* ======================={Partner Contact Info}======================= */}
        {/* ======================={Partner IT Security Info}======================= */}
        <div style={{ fontSize: 16, color: '#828282', marginTop: 10 }}>Partner IT Security Info</div>
        <div style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10 }}>
          <Row >
            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Name - Surname</div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="name_surname_partner_contact"
                rules={[{ required: true, message: 'Please input your Name - Surname !' }]}
              >
                <Input placeholder="Name - Surname" style={{ width: 280 }} />
              </Form.Item>
            </Col>

            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>ID Card No. </div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="idCardNo."
                rules={[{ required: true, message: 'Please input your ID Card No. !' }]}
              >
                <Input placeholder="ID Card No." style={{ width: 280 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row >
            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Office Phone No. </div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="officePhoneNo_partner_contact"
                rules={[{ required: true, message: 'Please input your Office Phone No. !' }]}
              >
                <Input placeholder="Office Phone No." style={{ width: 280 }} />
              </Form.Item>
            </Col>

            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Mobile No.</div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="mobileNo_partner_contact"
                rules={[{ required: true, message: 'Please input your Mobile No.!' }]}
              >
                <Input placeholder="Mobile No." style={{ width: 280 }} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={3}>
              <div style={{ display: "flex", flexDirection: 'row' }}>
                <div>Work Email </div>
                <div style={{ color: 'red' }}>* </div>
              </div>
            </Col>
            <Col span={6}>
              <Form.Item
                name="work_email_partner_contact"
                rules={[{ required: true, message: 'Please input your Work Email!' }]}
              >
                <Input placeholder="Work Email" style={{ width: 280 }} />
              </Form.Item>
            </Col>
          </Row>
        </div>
        {/* ======================={Partner IT Security Info}======================= */}
        < Form.Item style={{ marginTop: 30, textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Submit
           </Button>
        </Form.Item >
      </Form >

    </div >
  )
}
export default withTranslation('common')(AddPartner)



