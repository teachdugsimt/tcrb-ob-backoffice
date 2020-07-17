import React, { useState } from 'react'
import {
  Row, Col, Button, Upload, Input, Modal, Form,
  Menu, Dropdown, TimePicker, Table, Tag, Space,
  message, Select, DatePicker
} from 'antd'
import { useFormik, Formik } from 'formik'
import { DownOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons'
import { PageHeader } from '../page-header'
import { withTranslation } from '../../i18n'
import SimpleInput from '../simple-input'
import { inject, observer } from 'mobx-react'
import moment from 'moment'

const AddPartner = inject('partnerOnboard', 'loginStore')(observer((thisProps) => {
  // const [subDistrict, setSubDistrict] = useState('')
  // const [District, setDistrict] = useState('')
  // const [Province, setProvince] = useState('')
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const { t, partnerOnboard, loginStore } = thisProps

  const onFinish = values => {
    console.log('On success : ', values)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const _renderPrefixInput = (prefix, require) => {
    return <Col span={8}>
      <Row style={{ display: "flex", flexDirection: 'row' }}>
        <span>{prefix}</span>
        {require && <span style={{ color: 'red' }}>* </span>}
      </Row>
    </Col>
  }

  const _renderInput = (name, require, keyword, index) => {
    return <Col span={16}>
      <Form.Item
        name={keyword}
        rules={[{ required: require, message: `Please input your ${name} !` }]}
      >
        <Input placeholder={name} style={{ width: "80%" }} />
      </Form.Item>
    </Col>
  }

  const _renderFormInput = (item, index) => {
    return <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align={'bottom'}>
      <Col className="gutter-row" span={12} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Row span={12}>
          {_renderPrefixInput(item.name, item.require)}
          {_renderInput(item.name, item.require, item.keyword)}
        </Row>
      </Col>
    </Row>
  }

  const _renderUploadForm = (name, keyword, index) => {
    return <Row style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10, paddingBottom: 10 }}>
      <Col span={4} style={{ padding: 10 }} >
        <span>{name}</span>
      </Col>
      <Col span={4} style={{ padding: 10 }}>
        <Upload {...props}>
          <Button style={{ backgroundColor: 'white', color: '#595959' }}>
            <UploadOutlined />Upload
        </Button>
        </Upload>
      </Col>
    </Row>
  }


  const _renderDropdown = (item, index) => {
    return <Select
      mode="multiple"
      placeholder="Inserted are removed"
      value={selectedItems}
      onChange={this.handleChange}
      style={{ width: '100%' }}
    >{item.item.map(e => (
      <Select.Option key={e.key} value={e.value}>
        {e.name}
      </Select.Option>
    ))}</Select>
  }
  const _renderDatePicker = (item, index) => {
    if (item.mode == "start-end") {
      return <RangePicker
        ranges={{
          Today: [moment(), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
        }}
        showTime
        format="YYYY/MM/DD HH:mm:ss"
        onChange={onChange}
      />
    } else if (item.mode == "time") {
      return <TimePicker value={value} onChange={onChange} />
    } else if (item.mode == "date") {
      return <DatePicker
        dateRender={current => {
          const style = {};
          if (current.date() === 1) {
            style.border = '1px solid #1890ff';
            style.borderRadius = '50%';
          }
          return (
            <div className="ant-picker-cell-inner" style={style}>
              {current.date()}
            </div>
          );
        }}
      />
    }
  }
  const _renderRadio = (item, index) => {

  }
  const _renderCheckbox = (item, index) => {

  }

  const _renderForm = (arr) => {
    let form_arr = arr
    form_arr.map((item, index) => {
      if (item.type == "input") {
        return _renderFormInput(item, index)  // pass
      } else if (item.type == " dropdown") {
        return _renderDropdown(item, index)   // pass
      } else if (item.type == "datePicker") {
        return _renderDatePicker(item, index) //
      } else if (item.type == "upload") {
        return _renderUploadForm(item, index) // pass
      } else if (item.type == "radio") {
        return _renderRadio(item, index)      //
      } else if (item.type == "checkbox") {
        return _renderCheckbox(item, index)   //
      } else {
        return _renderFormInput(item, index)  // pass
      }
    })
  }

  return (
    <Row >
      <Col span={24}>
        <PageHeader>{props.title}</PageHeader>
      </Col>
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


      </Form >
    </Row >
  )
}))

export default withTranslation('common')(AddPartner)


// type = 'input, dropdown, date picker, upload, radio, checkbox'
let arr = [
  { // dropdown
    key: 3, id: 3, name: "Posting every", placeholder: '', keyword: "postingEvery",
    type: 'dropdown', require: true,
    item: [
      { key: 1, name: 'onboard', value: 'onboard' },
      { key: 2, name: 'partner', value: 'partner' },
      { key: 3, name: 'online banking', value: 'online banking' },
      { key: 4, name: 'thai credit bank', value: 'thai credit' },
    ]
  },
  { // input
    key: 4, id: 4, name: "Posting every", placeholder: 'Positing every', keyword: "postingEvery",
    type: 'input', require: true, item: null
  },
  { // upload
    key: 5, id: 5, name: "picture1", keyword: "uploadPicture1",
    type: 'upload', require: true
  },
  { // date picker
    key: 6, id: 6, name: "Start date", placeholder: 'Start Date', keyword: "startDate",
    type: 'datePicker', require: true, mode: 'date'
    // mode: date, start-end, time
  },
  { // radio
    key: 7, id: 7, name: "Status", placeholder: 'Status', keyword: "status",
    type: 'radio', require: true, item: [{
      key: 1, name: "sinle", value: 0
    }, { key: 2, name: "marry", value: 1 }]
  },
  { // checkbox
    key: 8, id: 8, name: "favorite", placeholder: 'Favorite', keyword: "favorite",
    type: 'checkbox', require: true, item: null, item: [
      { key: 1, name: "chocolate", value: "chocolate" },
      { key: 2, name: "magarong", value: "magarong" },
      { key: 3, name: "cracker", value: "cracker" },
    ]
  },
]
