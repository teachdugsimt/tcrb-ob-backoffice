import React, { useState } from 'react'
import { Row, Col, Button, Upload, Input, Modal, Form, Menu, Dropdown, Table, Tag, Space, message, Select } from 'antd'
import { useFormik, Formik } from 'formik'
import { DownOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons'
import { PageHeader } from '../page-header'
import { withTranslation } from '../../i18n'
import SimpleInput from '../simple-input'
import { inject, observer } from 'mobx-react'

const AddPartner = inject('partnerOnboard')(observer((thisProps) => {
  const [subDistrict, setSubDistrict] = useState('')
  const [District, setDistrict] = useState('')
  const [Province, setProvince] = useState('')
  const { Option } = Select;
  const { t, partnerOnboard } = thisProps

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

  const _transformTextName = (value) => {
    let newStr = '';
    for (var i = 0; i < value.length; i++) {
      if (value.charAt(i) === value.charAt(i).toUpperCase()) {
        newStr = newStr + ' ' + value.charAt(i)
      } else {
        (i == 0) ? (newStr += value.charAt(i).toUpperCase()) : (newStr += value.charAt(i));
      }
    }
    return newStr;
  }

  const props = () => {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange = ({ file, fileList }) => {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
        }
      }
  }

  const _renderPrefixInput = (prefix, require) => {
    return <Col span={8}>
      <Row style={{ display: "flex", flexDirection: 'row' }}>
        <span>{prefix}</span>
        {require && <span style={{ color: 'red' }}>* </span>}
      </Row>
    </Col>
  }

  const _renderInput = (name, require) => {
    return <Col span={16}>
      <Form.Item
        name={name}
        rules={[{ required: require, message: `Please input your ${_transformTextName(name)} !` }]}
      >
        <Input placeholder={_transformTextName(name)} style={{ width: "80%" }} />
      </Form.Item>
    </Col>
  }

  const _renderFormInput = (prefix, name, require) => {
    return <Col className="gutter-row" span={12} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Row span={12}>
        {_renderPrefixInput(prefix, require)}
        {_renderInput(name, require)}
      </Row>
    </Col>
  }

  const _renderUploadForm = (name) => {
    return [<Col span={4} style={{ padding: 10 }} >
      <span>{name}</span>
    </Col>,
    <Col span={4} style={{ padding: 10 }}>
      <Upload {...props}>
        <Button style={{ backgroundColor: 'white', color: '#595959' }}>
          <UploadOutlined />Upload
        </Button>
      </Upload>
    </Col>]
  }

  return (
    <Row >
      <Col span={24}>
        <PageHeader>Partner Registration</PageHeader>
      </Col>
      {/* <Row> */}
      <Form
        style={{ paddingTop: 20 }}
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
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align={'bottom'}>
          {_renderFormInput("Parent Assign Name", "parentAssignName", true)}
          {_renderFormInput("Partner Assign Name", "partnerAssignName", true)}
          {_renderFormInput("Juristic ID", "Juristic ID", true)}
          {_renderFormInput("Juristic Name(TH)", "Juristic Name(TH)", true)}
          {_renderFormInput("Juristic Name(En)", "Juristic Name(En)", true)}
          {_renderFormInput("Juristic Name(TH)", "Juristic Name(TH)", true)}
        </Row>

        {/* ======================={Address}======================= */}
        <Row className="gutter-row" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={3}>
            <div>Address </div>
          </Col>
          <Col className="gutter-row" span={4}><Form.Item name="houseNo">
            <Input placeholder="House No." />
          </Form.Item>
          </Col>

          <Col className="gutter-row" span={4}><Form.Item name="moo">
            <Input placeholder="Moo" />
          </Form.Item>
          </Col>

          <Col className="gutter-row" span={4}><Form.Item name="soi">
            <Input placeholder="Soi" />
          </Form.Item>
          </Col>

          <Col className="gutter-row" span={4}><Form.Item name="road">
            <Input placeholder="Road" />
          </Form.Item>
          </Col>
        </Row>

        <Row className="gutter-row" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={3}>
            {/* <div>Address </div> */}
          </Col>
          <Col className="gutter-row" span={4}>
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
          <Col className="gutter-row" span={4}>
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
          <Col className="gutter-row" span={4}>
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
          <Col className="gutter-row" span={4}>
            <Form.Item
              name="zipcode"
            >
              <Input placeholder="ZipCode" style={{ width: 180 }} />
            </Form.Item>
          </Col>
        </Row>
        {/* ======================={Address}======================= */}

        {/* ======================={Attachment Files}======================= */}
        <Row>
          <Col>
            <Row>
              <span style={{ fontSize: 16, color: '#828282' }}>Attachment Files</span>
            </Row>
            <Row>
              <span style={{ fontSize: 14, color: '#E5E5E5' }}>Only PDF support and the maximum file size is 500 MB</span>
            </Row>
          </Col>
        </Row>

        <Row style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10, paddingBottom: 10 }}>
          {_renderUploadForm("NDA")}
          {_renderUploadForm('Contract ' + '&' + ' MOU')}
          {_renderUploadForm('Company ' + '&' + ' Authorized Person Docs')}
          {_renderUploadForm('Vendor Valuation')}
          {_renderUploadForm('Others')}
        </Row >
        {/* ======================={Attachment Files}======================= */}

        {/* ======================={RM Contact Info}======================= */}
        <div style={{ fontSize: 16, color: '#828282', marginTop: 10 }}>RM Contact Info</div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align={'bottom'} style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10 }}>
          {_renderFormInput("Name - Surname", "name_surname", true)}
          {_renderFormInput("Employee ID", "employeeID", true)}
          {_renderFormInput("Department", "department", true)}
          {_renderFormInput("Office Phone No.", "officePhoneNo", true)}
          {_renderFormInput("Work Email ", "workEmail", true)}
        </Row>
        {/* ======================={RM Contact Info}======================= */}

        {/* ======================={Partner Contact Info}======================= */}
        <div style={{ fontSize: 16, color: '#828282', marginTop: 10 }}>Partner Contact Info</div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10 }}>
          {_renderFormInput("Name - Surname", "name_surname_partner_contact", true)}
          {_renderFormInput("ID Card No. ", "idCardNo", true)}

          {_renderFormInput("Office Phone No. ", "officePhoneNo_partner_contact", true)}
          {_renderFormInput("Mobile No.", "mobileNo_partner_contact", true)}

          {_renderFormInput("Work Email ", "work_email_partner_contact", true)}
        </Row>
        {/* ======================={Partner Contact Info}======================= */}
        {/* ======================={Partner IT Security Info}======================= */}
        <div style={{ fontSize: 16, color: '#828282', marginTop: 10 }}>Partner IT Security Info</div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10 }}>
          {_renderFormInput("Name - Surname", "name_surname_partner_it", true)}
          {_renderFormInput("ID Card No. ", "idCardNoIt", true)}

          {_renderFormInput("Office Phone No. ", "officePhoneNo_partner_it", true)}
          {_renderFormInput("Mobile No.", "mobileNo_partner_it", true)}

          {_renderFormInput("Work Email ", "work_email_partner_it", true)}
        </Row>
        {/* ======================={Partner IT Security Info}======================= */}
        < Form.Item style={{ marginTop: 30, textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            {t('submit')}
          </Button>
        </Form.Item >
      </Form >

    </Row >
  )
}))

export default withTranslation('common')(AddPartner)



