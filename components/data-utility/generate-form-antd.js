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
import styled from 'styled-components'
import { size } from '../../theme/size'
import { palette } from '../../theme/palette'

const GenerateFormAntd = inject('partnerOnboard', 'loginStore')(observer((props) => {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const { t, partnerOnboard, loginStore } = props

  const _renderPrefixInput = (prefix, require) => {
    return <Col className="gutter-row" span={8}>
      <Row style={{ display: "flex", flexDirection: 'row' }}>
        <span>{prefix}</span>
        {require && <span style={{ color: 'red' }}>* </span>}
      </Row>
    </Col>
  }

  const _renderInput = (item, index) => {
    return <Col className="gutter-row" span={16}>
      <Form.Item
        name={item.keyword}
        rules={[{ required: item.require, message: `Please input your ${item.name} !` }]}>
        <Input placeholder={item.name} style={{ width: "100%" }} />
      </Form.Item>
    </Col>
  }
  const _renderUpload = (item, index) => {
    return <Col className="gutter-row" span={16}>
      <Upload {...props}>
        <Button style={{ backgroundColor: 'white', color: '#595959' }}>
          <UploadOutlined />{t('upload')}
        </Button>
      </Upload>
    </Col>
  }

  const _renderDropdown = (item, index) => {
    return <Col className="gutter-row" span={16}><Select
      mode={item.mode == "multiple" ? "multiple" : ""}
      placeholder="Inserted are removed"
      defaultValue={t('pleaseSelect')}
      // value={item.value}
      // onChange={item.onChange}
      style={{ width: '100%' }}
    >{item.item.map(e => (
      <Select.Option key={e.key} value={e.value}>
        {e.name}
      </Select.Option>
    ))}</Select>
    </Col>
  }


  const _renderDatePicker = (item, index) => {
    if (item.mode == "start-end") {
      return <Col className="gutter-row" span={16}><RangePicker
        ranges={{
          Today: [moment(), moment()],
          'This Month': [moment().startOf('month'), moment().endOf('month')],
        }}
        showTime
        format="YYYY/MM/DD HH:mm:ss"
        onChange={item.onChange}
      /></Col>
    } else if (item.mode == "time") {
      return <Col className="gutter-row" span={16}><TimePicker value={item.value} onChange={item.onChange} /></Col>
    } else if (item.mode == "date") {
      return <Col className="gutter-row" span={16}><DatePicker
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
      /></Col>
    }
  }

  const _renderRadio = (item, index) => {
    return <Col className="gutter-row" span={16}><Radio.Group
      options={item.item}
      onChange={item.onChange}
      value={item.value}
      optionType="button"
      buttonStyle="solid"
    /></Col>
  }

  const _renderCheckbox = (item, index) => {
    return <Col className="gutter-row" span={16}><Checkbox.Group style={{ width: '100%' }} onChange={item.onChange}>
      <Row>
        {item.item.map((e, i) => {
          return <Col span={8}>
            <Checkbox value={e.value}>{e.name}</Checkbox>
          </Col>
        })}
      </Row>
    </Checkbox.Group></Col>
  }

  const _renderInputForm = (item, index) => {
    return <Col className="gutter-row" style={{ paddingTop: index == 0 || index == 1 ? "2%" : 0 }} span={12} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ width: '100%' }}>
        {_renderPrefixInput(item.name, item.require)}
        {_renderInput(item, index)}
      </Row>
    </Col>
  }

  const _renderUploadForm = (item, index) => {
    return <Col className="gutter-row" style={{ paddingTop: index == 0 || index == 1 ? "2%" : 0 }} span={12} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ width: '100%' }}>
        {_renderPrefixInput(item.name, item.require)}
        {_renderUpload(item, index)}
      </Row>
    </Col>
  }

  const _renderDropdownForm = (item, index) => {
    return <Col className="gutter-row" style={{ marginTop: index == 0 || index == 1 ? "2%" : 0, marginBottom: "2.25%" }} span={12} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ width: '100%' }}>
        {_renderPrefixInput(item.name, item.require)}
        {_renderDropdown(item, index)}
      </Row>
    </Col>
  }

  const _renderDateForm = (item, index) => {
    return <Col className="gutter-row" style={{ paddingTop: index == 0 || index == 1 ? "2%" : 0 }} span={12} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ width: '100%' }}>
        {_renderPrefixInput(item.name, item.require)}
        {_renderDatePicker(item, index)}
      </Row>
    </Col>
  }

  const _renderRadioForm = (item, index) => {
    return <Col className="gutter-row" style={{ paddingTop: index == 0 || index == 1 ? "2%" : 0 }} span={12} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ width: '100%' }}>
        {_renderPrefixInput(item.name, item.require)}
        {_renderRadio(item, index)}
      </Row>
    </Col>
  }

  const _renderCheckboxForm = (item, index) => {
    return <Col className="gutter-row" style={{ paddingTop: index == 0 || index == 1 ? 20 : 0 }} span={12} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ width: '100%' }}>
        {_renderPrefixInput(item.name, item.require)}
        {_renderCheckbox(item, index)}
      </Row>
    </Col>
  }

  const _renderForm = (arr) => {
    let form_arr = arr
    let render = form_arr.map((item, index) => {
      return <Row style={{ width: '100%' }} justify={'center'}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{
          width: '100%',
          borderBottom: index == arr.length - 1 ? "1px solid #C4C4C4" : '',
          borderTop: index == 0 ? "1px solid #C4C4C4" : "",
          borderRight: "1px solid #C4C4C4", borderLeft: "1px solid #C4C4C4",
        }} >
          {index != 0 && <Row style={{ width: '100%' }} justify={'center'}>
            <Col styled={{ width: '1%' }}></Col>
            <Col style={{ borderTop: "1px solid #C4C4C4", width: '98%' }} ></Col>
            <Col styled={{ width: '1%' }}></Col></Row>}

          {item.section_name && <Col span={24} style={{ paddingTop: 20 }}><span style={{
            fontWeight: 'bold', fontSize: size.topic, color: palette.lightGrey
          }}>{item.section_name}</span></Col>}

          {item.section.map((e, i) => {
            if (e.type == "input") {
              return _renderInputForm(e, i)
            } else if (e.type == "dropdown") {
              return _renderDropdownForm(e, i)
            } else if (e.type == "checkBox") {
              return _renderCheckboxForm(e, i)
            } else if (e.type == "radio") {
              return _renderRadioForm(e, i)
            } else if (e.type == "date") {
              return _renderDateForm(e, i)
            } else if (e.type == "upload") {
              return _renderUploadForm(e, i)
            } else {
              console.log("E : ", e)
            }
          })}
        </Row>
      </Row >
    })
    return render
  }

  return (
    // <Row >
    <Form
      style={{ paddingTop: 20 }}
      name="basic"
      initialValues={props.initialValues}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      {_renderForm(props.datasource)}
    </Form >
    // </Row >
  )
}))

export default withTranslation('common')(GenerateFormAntd)


// type = 'input, dropdown, date, upload, radio, checkbox'
// let arr = [
//   { // dropdown
//     key: 1, id: 1, name: "Free Type", placeholder: '', keyword: "postingEvery",
//     type: 'dropdown', require: true,
//     item: [
//       { key: 1, name: 'onboard', value: 'onboard' },
//       { key: 2, name: 'partner', value: 'partner' },
//       { key: 3, name: 'online banking', value: 'online banking' },
//       { key: 4, name: 'thai credit bank', value: 'thai credit' },
//     ]
//   },
//   { // input
//     key: 4, id: 4, name: "Posting every", placeholder: 'Positing every', keyword: "postingEvery",
//     type: 'input', require: true, item: null
//   },
//   { // upload
//     key: 5, id: 5, name: "picture1", keyword: "uploadPicture1",
//     type: 'upload', require: true
//   },
//   { // date picker
//     key: 6, id: 6, name: "Start date", placeholder: 'Start Date', keyword: "startDate",
//     type: 'datePicker', require: true, mode: 'date', onChange: () => { }
//     // mode: date, start-end, time
//   },
//   { // radio
//     key: 7, id: 7, name: "Status", placeholder: 'Status', keyword: "status",
//     value: radioValue, onChange: () => { },
//     type: 'radio', require: true, item: [{
//       key: 1, label: "sinle", value: 0
//     }, { key: 2, label: "marry", value: 1 }]
//   },
//   { // checkbox
//     key: 8, id: 8, name: "favorite", placeholder: 'Favorite', keyword: "favorite",
//     type: 'checkbox', require: true, item: null,
//     value: radioValue, onChange: () => { },
//     item: [
//       { key: 1, name: "chocolate", value: "chocolate" },
//       { key: 2, name: "magarong", value: "magarong" },
//       { key: 3, name: "cracker", value: "cracker" },
//     ]
//   },
// ]








