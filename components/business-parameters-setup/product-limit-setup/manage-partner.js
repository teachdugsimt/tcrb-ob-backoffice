import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../../i18n'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';

import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { addKeyToDataSource, addCommaInData } from '../../data-utility'

const managePartner =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const { businessParametersSetupStore, t } = props
      const [form] = Form.useForm();
      const [editingKey, setEditingKey] = useState('')
      const isEditing = record => record.key === editingKey;
      const [mockDataPartnerList, setMockDataPartnerList] = useState([])
      // var mockDataPartnerList = []
      useEffect(() => {
        addKeyToDataSource(businessParametersSetupStore.channelPartnerList).then((result) => {
          // mockDataPartnerList = result
          setMockDataPartnerList(result)
        })
      }, [])

      const edit = record => {
        form.setFieldsValue({
          partner_code: record.product_type,
          partner_description: record.product_description,
          transaction_limit: '',
          daily_limit: '',
          ...record,
        });
        setEditingKey(record.key);
      };

      const cancel = () => {
        setEditingKey('');
      };

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
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
          <td {...restProps}>
            {editing ? (

              <Form.Item
                name={dataIndex == 'product_type' ? 'product_code' : dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: (inputType === 'number') ? true : false,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
                children
              )
            }
          </td>
        );
      };

      const prepareAllLimitToSubmitAndUpdate = () => {
        if (viewSpecificProduct) {
          // submitAddSpecificLimit()
          setModalString(
            <div style={{ textAlign: "center" }}>
              <p> Add Partner {selectPartnerAndProduct.type} </p>
              {/* <p>for {selectPartnerAndProduct.partner_code}/{selectPartnerAndProduct.partner_abbreviation} Channel/Partner !!!</p> */}
            </div>
          )
        } else {
          // submitChangeProductLimitSelect()

          setModalString(
            //waiting for confirm task
            <div style={{ textAlign: "center" }}>
              <p> Change Product Code {selectPartnerAndProduct.partner_code} Limit </p>
              <p>for {selectPartnerAndProduct.partner_code}/{selectPartnerAndProduct.partner_abbreviation} Channel/Partner !!!</p>
            </div>
          )
        }
        setVisble(true)
        setTitleModal('Confirm')
        setModalType("confirm")
      }
      const goBackToProductList = () => {
        businessParametersSetupStore.goBack = true
      }

      const renderAction = (record) => {
        /* if (record.status === '1') {
          return (
            <div>
              <TcrbPopconfirm title="Sure to Delete?" onConfirm={(e) => { submitDeleteProduct(record) }} disabled={editingKey !== ''}>
                <a><DeleteOutlined style={{ fontSize: '18px' }} /></a>
              </TcrbPopconfirm>
              <a onClick={() => selectProductToViewDetail(record)}><SettingOutlined style={{ fontSize: '18px', color: '#FBA928' }} /></a>
              <a onClick={() => selectProductToSpecificLimit(record)}><FormOutlined style={{ fontSize: '18px', color: '#FBA928' }} /></a>
            </div>)
        } else if (record.status === '2') {
          return null
        } else {
          return (<div>
            <TcrbPopconfirm title={"Confirm to Add !!!"} onConfirm={() => { submitAddnewProduct(record.key) }} >
              <a>Confirm</a>
            </TcrbPopconfirm><br />
            <TcrbPopconfirm title={"Confirm to Cancel !!!"} onConfirm={() => { cancelAddNewProduct(record.key) }} >
              <a>Cancel</a>
            </TcrbPopconfirm>
          </div>)
        } */
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
            <div style={{ textAlign: "center" }}>
              <TcrbPopconfirm title="Sure to Delete?" disabled={editingKey !== ''}>
                <a><DeleteOutlined style={{ fontSize: '18px' }} /></a>
              </TcrbPopconfirm>
              <a disabled={editingKey !== ''} onClick={() => edit(record)}><EditOutlined style={{ fontSize: '18px', color: '#FBA928' }} /></a>
            </div>
          );
        {/* <EditOutlined /> */ }
      }
      const columnPartnerList = [
        {
          title: 'Partner / Channel',
          dataIndex: 'partner_code',
          render: (text, record) => addCommaInData(text)
        },
        {
          title: 'Partner Description',
          dataIndex: 'partner_abbreviation',
          render: (text, record) => addCommaInData(text)
        },
        {
          title: 'Txn Limit',
          dataIndex: 'transaction_limit',
          editable: true,
          render: (text, record) => addCommaInData(text, true)
        },
        {
          title: ' Daily Limit',
          dataIndex: 'daily_limit',
          editable: true,
          render: (text, record) => addCommaInData(text, true)
        },
        {
          title: 'Action',
          dataIndex: 'operation',
          width: '5%',
          render: (text, record, index) =>
            renderAction(record, index)
        },
      ]
      const mergedColumns = columnPartnerList.map(col => {
        if (!col.editable) {
          return col;
        }

        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'product_description' ? 'text' : 'number',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });

      return (
        <div style={{ padding: 24 }}>
          <Row gutter={[4, 24]}>
            <Col span={6}>Product_Code</Col>
            <Col span={6}>{businessParametersSetupStore.productLimitDetail.product_type}</Col>
            <Col span={6}>Product_Description</Col>
            <Col span={6}>{businessParametersSetupStore.productLimitDetail.product_description}</Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={6}>All-Channel Txn Limit</Col>
            <Col span={6}>{businessParametersSetupStore.productLimitDetail.transaction_limit}</Col>
            <Col span={6}>All-Channel Daily Limit</Col>
            <Col span={6}>{businessParametersSetupStore.productLimitDetail.daily_limit}</Col>
          </Row>
          <Row justify="end" style={{ marginTop: 8 }}>
            <Col span={2}>
              <TcrbButton className="default" onClick={() => goBackToProductList()} shape="round">Back</TcrbButton>
            </Col>
            <Col span={2}>
              <TcrbButton shape="round" className="primary" onClick={() => { prepareAllLimitToSubmitAndUpdate() }}>Submit</TcrbButton>
            </Col>
          </Row>
          <Divider />
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={mockDataPartnerList}
              columns={mergedColumns}
              size="small"
            />
          </Form>
        </div>
      )
    }))
export default withTranslation('common')(managePartner)
