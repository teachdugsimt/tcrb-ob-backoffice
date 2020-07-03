import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { withTranslation } from '../../../i18n'
import { Table, Row, Col, Menu, Card, Input, Select, Form, InputNumber, Divider, Popconfirm, Space } from 'antd'
import { DeleteOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import { orange, green, gold } from '@ant-design/colors';

import { TcrbButton, TcrbPopconfirm } from '../../antd-styles/styles'
import { addKeyToDataSource, addCommaInData } from '../../data-utility'
import SimpleInput from '../../simple-input'
import SimpleModal from '../../simple-modal'
import { toJS } from 'mobx';

let txnLimit = null
let dailyLimit = null

const managePartner =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const { businessParametersSetupStore, t } = props
      const [form] = Form.useForm();
      const [editingKey, setEditingKey] = useState('')
      const isEditing = record => record.key === editingKey;
      const [dataSource, setDataSource] = useState([])
      const [isEnableEditButton, setIsEnableEditButton] = useState(true)
      const [visible, setVisble] = useState(false)
      const [modalString, setModalString] = useState('')
      const [titleModal, setTitleModal] = useState('')
      const [modalType, setModalType] = useState('')

      // var mockDataPartnerList = []
      useEffect(() => {
        //wait call api
        businessParametersSetupStore.getDataActivePartnerBindingList(businessParametersSetupStore.productLimitDetail)

        txnLimit = businessParametersSetupStore.productLimitDetail.transaction_limit
        dailyLimit = businessParametersSetupStore.productLimitDetail.daily_limit
      }, [])

      useEffect(() => {
        if (businessParametersSetupStore.responseActivePartnerBindingList.length >= 1) {
          addKeyToDataSource(businessParametersSetupStore.responseActivePartnerBindingList).then((result) => {
            // mockDataPartnerList = result
            setDataSource(result)
          })
        }
      }, [businessParametersSetupStore.responseActivePartnerBindingList])

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
        const inputNode = inputType === 'number' ? <InputNumber style={{ width: "100%" }} /> : <Input />;
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex == 'product_type' ? 'product_code' : dataIndex}
                style={{
                  margin: 0
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
      const submitChangeProductLimitSelect = () => {
        //call api
        let request = {
          // partner_code: selectPartnerAndProduct.partner_code,
          // product_code: businessParametersSetupStore.productLimitDetail.product_code,
          // transaction_code: '6931',
          action: "Update",
          currentData: businessParametersSetupStore.productLimitDetail,
          newData: { ...businessParametersSetupStore.productLimitDetail, transaction_limit: txnLimit, daily_limit: dailyLimit },
          // transaction_limit: txnLimit,
          // daily_limit: dailyLimit
        }
        businessParametersSetupStore.changeProductLimit(request)
        setIsEnableEditButton(true)
        setVisble(false)
      }

      const prepareAllLimitToSubmitAndUpdate = () => {
        setModalString(
          //waiting for confirm task
          <div style={{ textAlign: "center" }}>
            <p>Confirm to Change Limit Product Code {businessParametersSetupStore.productLimitDetail.product_type}  !!!</p>
            <p style={{ color: orange[6] }}>Your changes will take effect after being approved.</p>
          </div>
        )
        setVisble(true)
        setTitleModal('Confirm')
        setModalType("confirm")
      }
      const goBackToProductList = () => {
        businessParametersSetupStore.goBack = true
      }

      const save = async key => {
        const row = await form.validateFields();
        const newData = [...dataSource];
        const index = newData.findIndex(item => key === item.key);
        const item = newData[index];

        /* if (index > -1) {
          const item = newData[index];
          console.log({ ...item, ...row })
          newData.splice(index, 1, { ...item, ...row });
          setDataSource(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setDataSource(newData);
          setEditingKey('');
        } */
        let request = {
          currentData: item,
          newData: { ...item, ...row }
        }
        setEditingKey('');

        businessParametersSetupStore.submitUpdatePartnerLimit(request)

        // console.log(toJS(businessParametersSetupStore.productLimitDetail))
        /* try {
          const row = await form.validateFields();
          const newData = [...mockDataPartnerList];
          const index = newData.findIndex(item => key === item.key);

          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setData(newData);
            setEditingKey('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        } */
      };

      const deletePartnerSelect = (record) => {
        console.log(toJS(record))
        businessParametersSetupStore.deletePartner(record)
        //waiting call api
      }

      const setEditEnableLimit = () => {
        setIsEnableEditButton(false)
      }

      const cancelEditLimit = () => {
        setIsEnableEditButton(true)
      }

      const renderAction = (record) => {
        const editable = isEditing(record);
        if (record.status === '1') {
          return editable ? (
            <span>
              <TcrbPopconfirm title="Sure to Delete?" onConfirm={() => save(record.key)}>
                <a style={{ marginRight: 8, }}>
                  Save
              </a>
              </TcrbPopconfirm>
              <TcrbPopconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a style={{ color: '#3e3e3e' }}>Cancel</a>
              </TcrbPopconfirm>
            </span>
          ) : (
              <div style={{ textAlign: "center" }}>
                <TcrbPopconfirm title="Sure to Delete?" disabled={editingKey !== ''} onConfirm={() => deletePartnerSelect(record)}>
                  <a><DeleteOutlined style={{ fontSize: '18px', paddingRight: 8 }} /></a>
                </TcrbPopconfirm>
                <a disabled={editingKey !== ''} onClick={() => edit(record)}><EditOutlined style={{ fontSize: '18px', color: '#FBA928' }} /></a>
              </div>
            );
        } else if (record.status === '2') {
          return null
        } else {
          return null
        }

        {/* <EditOutlined /> */ }
      }
      //1,2 active, 3 pending
      const checkStatus = (record) => {
        if (record.status === '1') {
          return <p style={{ color: green[6] }}>Active</p>
        } else if (record.status === '2') {
          return <p style={{ color: gold[6] }}>Pending</p>
        } else {
          return null
        }
      }
      const columnPartnerList = [
        {
          title: '',
          dataIndex: 'status',
          width: '5%',
          render: (text, record) => checkStatus(record)
        },
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
          width: '10%',
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
        <div>
          <Row gutter={[4, 24]}>
            <Col span={2}>
              <TcrbButton className="default" onClick={() => goBackToProductList()} shape="round">Back</TcrbButton>
            </Col>
          </Row>
          <Row gutter={[4, 24]}>
            <Col span={6}>Product_Code</Col>
            <Col span={6}>{businessParametersSetupStore.productLimitDetail.product_type}</Col>
            <Col span={6}>Product_Description</Col>
            <Col span={6}>{businessParametersSetupStore.productLimitDetail.product_description}</Col>

          </Row>
          <Row gutter={[4, 24]}>
            <Col span={6}>All-Channel Txn Limit</Col>
            {/* <Col span={6}>{businessParametersSetupStore.productLimitDetail.transaction_limit}</Col> */}
            <Col span={6}> {isEnableEditButton ?
              businessParametersSetupStore.productLimitDetail.transaction_limit :
              <SimpleInput defaultValue={businessParametersSetupStore.productLimitDetail.transaction_limit} halfsize={true} onChange={(e) => txnLimit = e} />}
            </Col>

            <Col span={6}>All-Channel Daily Limit</Col>
            {/* <Col span={6}>{businessParametersSetupStore.productLimitDetail.daily_limit}</Col> */}
            <Col span={6}> {isEnableEditButton ?
              businessParametersSetupStore.productLimitDetail.daily_limit :
              <SimpleInput defaultValue={businessParametersSetupStore.productLimitDetail.daily_limit} halfsize={true} onChange={(e) => dailyLimit = e} />}
            </Col>
          </Row>
          <Row justify="end" style={{ marginTop: 8, textAlign: "right" }}>
            {/* <Col span={2}>
              <TcrbButton className="default" onClick={() => goBackToProductList()} shape="round">Back</TcrbButton>
            </Col> */}
            <Col span={4}>
              {isEnableEditButton ? (
                <TcrbButton shape="round" className="primary" onClick={() => { setEditEnableLimit() }}>Edit</TcrbButton>
              ) : (
                  <Space size={8}>
                    <TcrbButton shape="round" className="default" onClick={() => { cancelEditLimit() }}>Cancel</TcrbButton>
                    <TcrbButton shape="round" className="primary" onClick={() => { prepareAllLimitToSubmitAndUpdate() }}>Submit</TcrbButton>
                  </Space>
                )}
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
              dataSource={dataSource}
              columns={mergedColumns}
              size="small"
            />
          </Form>
          <SimpleModal
            title={titleModal}
            type={modalType}
            onOk={() => { submitChangeProductLimitSelect() }}
            onCancel={() => setVisble(false)}
            textOk={t("confirm")}
            textCancel={t("cancel")}
            modalString={modalString}
            visible={visible}
          />
        </div>
      )
    }))
export default withTranslation('common')(managePartner)
