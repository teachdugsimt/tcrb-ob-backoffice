import React, { useState } from 'react'
import Link from 'next/link'
import { Row, Col, Button, Upload, Input, Modal, Form, Menu, Dropdown, Table, Tag, Space, message, Select } from 'antd'
import { useFormik, Formik } from 'formik'
import { DownOutlined, UserOutlined, UploadOutlined, FolderOutlined } from '@ant-design/icons'
import { withTranslation } from '../../../i18n'

const FeeSettlementForm = () => {

  const formik = useFormik({
    initialValues: {
      parentAssignName: '',
      assignName: '',
      registeredApplicationName: '',
      juristicID: '',
      partnerContactEmail: '',
      partnerContactMobileNo: '',
      partnerContactName: '',
      juristicName_th: '',
      status: ''
    },
    onSubmit: values => {
      console.log(values)
      alert(JSON.stringify(values, null, 2));
    },
  });

  const feeType = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Fix per period
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Fix per transaction
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        Percentage per transaction
      </Menu.Item>
      <Menu.Item key="4" icon={<UserOutlined />}>
        Tier of transaction amount
      </Menu.Item>
      <Menu.Item key="5" icon={<UserOutlined />}>
        Tier of transaction volumn
      </Menu.Item>
      <Menu.Item key="6" icon={<UserOutlined />}>
        Tier of amount volumn
      </Menu.Item>
    </Menu>
  );

  const postingEvery = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<FolderOutlined />}>
        Day
      </Menu.Item>
      <Menu.Item key="2" icon={<FolderOutlined />}>
        Week
      </Menu.Item>
      <Menu.Item key="3" icon={<FolderOutlined />}>
        Month
      </Menu.Item>
      <Menu.Item key="4" icon={<FolderOutlined />}>
        year
      </Menu.Item>
    </Menu>
  );

  const postingAccountType = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<FolderOutlined />}>
        CA : Current account
      </Menu.Item>
      <Menu.Item key="2" icon={<FolderOutlined />}>
        SA : Saving account
      </Menu.Item>
      <Menu.Item key="3" icon={<FolderOutlined />}>
        GL Entries
      </Menu.Item>
    </Menu>
  );

  const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  }

  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const props = () => {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      onChange = ({ file, fileList }) => {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
        }
      }
  }
  return (
    <Row>
      <Form onSubmit={formik.handleSubmit} style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <div style={{ height: 930, border: '1px solid Lightgrey', padding: 20 }}>
          <div style={{ height: 100, borderBottom: '1px solid LightGrey' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="Address">Fee Type</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Dropdown overlay={feeType}>
                    <Button style={{ backgroundColor: 'white', color: "Lightgrey", width: 300, border: '1px solid Lightgrey' }}>

                      Fee Type
                      <DownOutlined style={{ textAlign: 'end' }} />

                    </Button>
                  </Dropdown>
                </div>
              </div>

              <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="Address">Fee Value</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Input placeholder="Fee Value" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="Address">Posting every</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Dropdown overlay={postingEvery}>
                  <Button style={{ backgroundColor: 'white', width: 300, color: "Lightgrey", border: '1px solid Lightgrey' }}>
                    Day <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
          <div style={{ height: 255, borderBottom: '1px solid LightGrey' }}>
            <div style={{ fontSize: 16, color: '#828282', paddingTop: 10 }}>Debit Information</div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="parentAssignName">Debitor</label>
                </div>
                <div style={{ display: 'flex', width: 300, flexDirection: 'column' }}>
                  <div style={{ fontSize: 10 }}>Customer / TCRB / Partner</div>
                  <Dropdown overlay={postingEvery}>
                    <Button style={{ backgroundColor: 'white', width: 300, color: "Lightgrey", border: '1px solid Lightgrey' }}>
                      Debitor <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="partnerAssignName">Posting Account Type</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Dropdown overlay={postingAccountType}>
                    <Button style={{ backgroundColor: 'white', width: 300, color: "Lightgrey", border: '1px solid Lightgrey' }}>
                      Posting Account Type  <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="parentAssignName">Credit Account</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Input placeholder="Credit Account" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="partnerAssignName">Credit Amount</label>
                </div>
                <div style={{ display: 'flex', width: 300, flexDirection: 'column' }}>
                  <div style={{ fontSize: 10 }}>input only this field when debitor is customer</div>
                  <Input placeholder="Credit Amount" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="parentAssignName">Credit Branch</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Input placeholder="Credit Branch" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="partnerAssignName">Credit Cost Center</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Input placeholder="Credit Cost Center" />
                </div>
              </div>
            </div>
            <div style={{ fontSize: 10, marginTop: 8 }}>debit branch and debit cost center not show when posting account type is ca/sa</div>
          </div>
          <div style={{ height: 255, borderBottom: '1px solid LightGrey' }}>
            <div style={{ fontSize: 16, color: '#828282', paddingTop: 10 }}>Credit Information #1</div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="parentAssignName">Creditor</label>
                </div>
                <div style={{ display: 'flex', width: 300, flexDirection: 'column' }}>
                  <div style={{ fontSize: 10 }}>TCRB / Partner</div>
                  <Dropdown overlay={postingEvery}>
                    <Button style={{ backgroundColor: 'white', width: 300, color: "Lightgrey", border: '1px solid Lightgrey' }}>
                      Creditor <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="partnerAssignName">Posting Account Type</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Dropdown overlay={postingAccountType}>
                    <Button style={{ backgroundColor: 'white', width: 300, color: "Lightgrey", border: '1px solid Lightgrey' }}>
                      Posting Account Type  <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="parentAssignName">Credit Account</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Input placeholder="Credit Account" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="partnerAssignName">Credit Amount</label>
                </div>
                <div style={{ display: 'flex', width: 300, flexDirection: 'column' }}>
                  <div style={{ fontSize: 10 }}>input only this field when debitor is customer</div>
                  <Input placeholder="Credit Amount" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="parentAssignName">Credit Branch</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Input placeholder="Credit Branch" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="partnerAssignName">Credit Cost Center</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Input placeholder="Credit Cost Center" />
                </div>
              </div>
            </div>
            <div style={{ fontSize: 10, marginTop: 8 }}>debit branch and debit cost center not show when posting account type is ca/sa</div>
          </div>
          <div style={{ height: 255, borderBottom: '1px solid LightGrey' }}>
            <div style={{ fontSize: 16, color: '#828282', paddingTop: 10 }}>Credit Information #1</div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="parentAssignName">Creditor</label>
                </div>
                <div style={{ display: 'flex', width: 300, flexDirection: 'column' }}>
                  <div style={{ fontSize: 10 }}>TCRB / Partner</div>
                  <Dropdown overlay={postingEvery}>
                    <Button style={{ backgroundColor: 'white', width: 300, color: "Lightgrey", border: '1px solid Lightgrey' }}>
                      Creditor <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="partnerAssignName">Posting Account Type</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Dropdown overlay={postingAccountType}>
                    <Button style={{ backgroundColor: 'white', width: 300, color: "Lightgrey", border: '1px solid Lightgrey' }}>
                      Posting Account Type  <DownOutlined />
                    </Button>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="parentAssignName">Credit Account</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Input placeholder="Credit Account" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="partnerAssignName">Credit Amount</label>
                </div>
                <div style={{ display: 'flex', width: 300, flexDirection: 'column' }}>
                  <div style={{ fontSize: 10 }}>input only this field when debitor is customer</div>
                  <Input placeholder="Credit Amount" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="parentAssignName">Credit Branch</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Input placeholder="Credit Branch" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
                <div style={{ width: 150 }}>
                  <label htmlFor="partnerAssignName">Credit Cost Center</label>
                </div>
                <div style={{ display: 'flex', width: 300 }}>
                  <Input placeholder="Credit Cost Center" />
                </div>
              </div>
            </div>
            <div style={{ fontSize: 10, marginTop: 8 }}>debit branch and debit cost center not show when posting account type is ca/sa</div>
          </div>
        </div>
        <div style={{ height: 100, textAlign: 'end', paddingTop: 30, paddingRight: 30 }}>
          {/* <Button type="submit">Submit</Button> */}
          <button type="submit"
            style={{
              backgroundColor: 'orange',
              border: '0px solid ',
              width: 80,
              height: 35,
              color: 'white'

            }}>Submit</button>
        </div>
      </Form>
    </Row>
  )
}
export default withTranslation('common')(FeeSettlementForm)
