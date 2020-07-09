import React from 'react'
import { Row, Col, Button, Upload, Input, Modal, Menu, Dropdown, Table, Tag, Space } from 'antd'
import { useFormik, Formik } from 'formik'
import { DownOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons'
import { PageHeader } from '../page-header'
import { withTranslation } from '../../i18n'
import SimpleInput from '../simple-input'

const AddPartner = () => {
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

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd item
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
    <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }} >
      <PageHeader>Partner Registration</PageHeader>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <div style={{ height: 515, borderBottom: '1px solid Lightgrey' }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="parentAssignName">Parent Assign Name</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input
                  id="parentAssignName"
                  name="parentAssignName"
                  type="parentAssignName"
                  onChange={formik.handleChange}
                  value={formik.values.parentAssignName}
                  placeholder="Parent Assign Name"
                />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="partnerAssignName">Partner Assign Name</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Partner Assign Name" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="JuristicID">Juristic ID</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Juristic ID" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="juristicName_th">Juristic Name(TH)</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Juristic Name(TH)" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="juristicName_en">Juristic Name(En)</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Juristic Name(En)" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="productSegment">Product Segment</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Product Segment" />
              </div>
            </div>
          </div>
          <div style={{ height: 100, marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="Address">Address</label>
              </div>
              <div style={{ display: 'flex', width: 150 }}>
                <Input placeholder="House No." />
              </div>
              <div style={{ display: 'flex', width: 150, paddingLeft: 20 }}>
                <Input placeholder="Village No./ Moo" />
              </div>
              <div style={{ display: 'flex', width: 150, paddingLeft: 20 }}>
                <Input placeholder="Lane/ Soi" />
              </div>
              <div style={{ display: 'flex', width: 150, paddingLeft: 20 }}>
                <Input placeholder="Road" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 20 }}>
              <div style={{ width: 150 }}></div>
              <div style={{ display: 'flex', width: 150 }}>
                <Dropdown overlay={menu}>
                  <Button style={{ backgroundColor: 'white', color: "Lightgrey", width: 150, border: '1px solid Lightgrey' }}>
                    Sub-district <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <div style={{ display: 'flex', width: 150, paddingLeft: 20 }}>
                <Dropdown overlay={menu}>
                  <Button style={{ backgroundColor: 'white', color: "Lightgrey", width: 150, border: '1px solid Lightgrey' }}>
                    District <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <div style={{ display: 'flex', width: 150, paddingLeft: 20 }}>
                <Dropdown overlay={menu}>
                  <Button style={{ backgroundColor: 'white', width: 150, color: "Lightgrey", border: '1px solid Lightgrey' }}>
                    Province <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <div style={{ display: 'flex', width: 150, paddingLeft: 20 }}>
                <Input placeholder="Zip Code" />
              </div>
            </div>
          </div>
          <div style={{ height: 200, marginTop: 20 }}>
            <div style={{ fontSize: 16, color: '#828282' }}>Attachment Files</div>
            <div style={{ fontSize: 14, color: '#E5E5E5' }}>Only PDF support and the maximum file size is 500 MB</div>
            <div style={{ height: 150, paddingTop: 20, display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: "flex", flex: 1, flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ width: 150 }}>
                    <label htmlFor="nda" style={{ fontSize: 13.5 }}>NDA</label>
                  </div>
                  <div style={{ display: 'flex', width: 150 }}>
                    {/* <Input placeholder="House No." /> */}
                    <Upload {...props}>
                      <Button style={{ backgroundColor: 'white', color: '#595959' }}>
                        <UploadOutlined /> Upload
                     </Button>
                    </Upload>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
                  <div style={{ width: 150 }}>
                    <label htmlFor="Address" style={{ fontSize: 13.5 }}>{"Company " + '&' + " Authorized Person Docs"}</label>
                  </div>
                  <div style={{ display: 'flex', width: 150 }}>
                    {/* <Input placeholder="Others" /> */}
                    <Upload {...props}>
                      <Button style={{ backgroundColor: 'white', color: '#595959' }}>
                        <UploadOutlined /> Upload
                     </Button>
                    </Upload>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
                  <div style={{ width: 150 }}>
                    <label htmlFor="other" style={{ fontSize: 13.5 }}>Others</label>
                  </div>
                  <div style={{ display: 'flex', width: 150 }}>
                    {/* <Input placeholder="House No." /> */}
                    <Upload {...props}>
                      <Button style={{ backgroundColor: 'white', color: '#595959' }}>
                        <UploadOutlined /> Upload
                     </Button>
                    </Upload>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flex: 1 }}>
                <div style={{ display: "flex", flex: 1, flexDirection: 'column' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: 150 }}>
                      <label htmlFor="Contract_MOU" style={{ fontSize: 13.5 }}>{'Contract ' + '&' + ' MOU'}</label>
                    </div>
                    <div style={{ display: 'flex', width: 150 }}>
                      {/* <Input placeholder="House No." /> */}
                      <Upload {...props}>
                        <Button style={{ backgroundColor: 'white', color: '#595959' }}>
                          <UploadOutlined /> Upload
                     </Button>
                      </Upload>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', paddingTop: 10 }}>
                    <div style={{ width: 150 }}>
                      <label htmlFor="vendorValuation" style={{ fontSize: 13.5 }}>Vendor Valuation</label>
                    </div>
                    <div style={{ display: 'flex', width: 150 }}>
                      {/* <Input placeholder="Vendor Valuation" /> */}
                      <Upload {...props}>
                        <Button style={{ backgroundColor: 'white', color: '#595959' }}>
                          <UploadOutlined /> Upload
                     </Button>
                      </Upload>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ height: 200, borderBottom: '1px solid Lightgrey' }}>
          {/* <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flex: 1, flexDirection: 'column' }}> */}
          <div style={{ fontSize: 16, color: '#828282' }}>RM Contact Info</div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="parentAssignName">Name - Surname *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Name - Surname" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="partnerAssignName">Employee ID *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Employee ID" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="parentAssignName">Department *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Department" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="partnerAssignName">Office Phone No. *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Office Phone No." />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="parentAssignName">Mobile No. *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Mobile No." />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="partnerAssignName">Work Email *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Work Email" />
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
        <div style={{ height: 200, borderBottom: '1px solid Lightgrey' }}>
          {/* <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flex: 1, flexDirection: 'column' }}> */}
          <div style={{ fontSize: 16, color: '#828282' }}>Partner Contact Info</div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="parentAssignName">Name - Surname *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Name - Surname" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="partnerAssignName">ID Card No. *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="ID Card No." />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="parentAssignName">Office Phone No. *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Office Phone No. *" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="partnerAssignName">Mobile No. *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Mobile No. *" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="partnerAssignName">Work Email *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Work Email" />
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>

        <div style={{ height: 200, borderBottom: '1px solid Lightgrey' }}>
          {/* <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flex: 1, flexDirection: 'column' }}> */}
          <div style={{ fontSize: 16, color: '#828282' }}>Partner IT Security Info</div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="parentAssignName">Name - Surname *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Name - Surname" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="partnerAssignName">ID Card *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="ID Card" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="parentAssignName">Office Phone No. *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Office Phone No. *" />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
              <div style={{ width: 150 }}>
                <label htmlFor="partnerAssignName">Mobile No. *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Mobile No. *" />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div style={{ width: 150 }}>
                <label htmlFor="partnerAssignName">Work Email *</label>
              </div>
              <div style={{ display: 'flex', width: 300 }}>
                <Input placeholder="Work Email" />
              </div>
            </div>
          </div>
          {/* </form> */}
        </div>
        <div style={{ height: 100, textAlign: 'center', paddingTop: 30 }}>
          {/* <Button type="submit">Submit</Button> */}
          <button type="submit" style={{ backgroundColor: 'orange', border: '0px solid ', width: 80, height: 35, color: 'white' }}>Submit</button>
        </div>
      </form>
    </div >
  )
}
export default withTranslation('common')(AddPartner)
