import React, { Component, useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'
import {
  WrapperImageBackgroundSignin, TextFooter, FooterText, BorderMainDiv, MainInput, SideWrapperMain, WrapperImageLogo,
  WrapLogo, WrapperButtonAnt,
} from './styles/styles'
import { Row, Col, Divider, Form, Input, Button, Checkbox } from 'antd';
import { BusinessParameterSetupApi } from '../../services/'
import { Layout } from 'antd';
import { i18n, withTranslation } from '../../i18n'
const { Header, Footer, Sider, Content } = Layout;
import logo02 from '../../images/logo.png'
import background from './styles/background.png'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Signin =
  inject('authenStore', 'businessParametersSetupStore')
    (observer((props) => {
      let customerMenu = [
        { id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
        { id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
        { id: 3, name: "PARTNER MANAGEMENT", translate: "partnerManagement", linkTo: "/", color: "#000000", typeLv: "38" },
        { id: 4, name: "CONSENT MANAGEMENT", translate: "consentManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { id: 5, name: "TERM & CONDITION MANAGEMENT", translate: "term&conditionManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { id: 6, name: "SECURITY CODE ENQUIRY", translate: "securityCodeEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
        { id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
        { id: 13, name: "PENDING APPROVE", translate: "pendingApprove", linkTo: "/pending-approve", color: "#000000", typeLv: "42" },
      ]

      let adminMenu = [
        { id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
        { id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
        { id: 3, name: "PARTNER MANAGEMENT", translate: "partnerManagement", linkTo: "/", color: "#000000", typeLv: "38" },
        { id: 4, name: "CONSENT MANAGEMENT", translate: "consentManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { id: 5, name: "TERM & CONDITION MANAGEMENT", translate: "term&conditionManagement", linkTo: "/", color: "#000000", typeLv: "30" },
        { id: 6, name: "SECURITY CODE ENQUIRY", translate: "securityCodeEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
        { id: 7, name: "NOTIFICATION ENQUIRY", translate: "notificationEnquiry", linkTo: "/", color: "#000000", typeLv: "50" },
        { id: 8, name: "BRANCH LOCATION ENQUIRY", translate: "branchLocation", linkTo: "/", color: "#000000", typeLv: "12" },
        { id: 9, name: "LIVE CHAT ENQUIRY", translate: "liveChat", linkTo: "/", color: "#000000", typeLv: "12" },
        { id: 10, name: "MARKETING ADS ENQUIRY", translate: "marketingAds", linkTo: "/", color: "#000000", typeLv: "12" },
        { id: 11, name: "DASHBOARD & REPORTS", translate: "dashboardReports", linkTo: "/", color: "#000000", typeLv: "42" },
        { id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
        { id: 13, name: "PENDING APPROVE", translate: "pendingApprove", linkTo: "/pending-approve", color: "#000000", typeLv: "42" },
        { id: 14, name: "USER ACCESS MANAGEMENT ENQUIRY", translate: "useAccessManagementEnquiry", linkTo: "/", color: "#000000", typeLv: "42" },
        { id: 15, name: "DEVICE ENQUIRY", translate: "deviceEnquiry", linkTo: "/", color: "#000000", typeLv: "42" },
      ]

      let userMenu = [
        { id: 1, name: "CUSTOMER SERVICES ENQUIRY", translate: "customerServicesEnquiry", linkTo: "/customer-service-enquiry", color: "#000000", typeLv: "42" },
        { id: 2, name: "CUSTOMER SERVICES MENU", translate: "customerServiceMenu", linkTo: "/customer-service-menu", color: "#000000", typeLv: "38" },
        { id: 12, name: "BUSINESS PARAMETERS SETUP", translate: "businessParametersSetup", linkTo: "/parameters-setup", color: "#000000", typeLv: "42" },
        { id: 13, name: "PENDING APPROVE", translate: "pendingApprove", linkTo: "/pending-approve", color: "#000000", typeLv: "42" },
      ]

      // const { authenStore } = useStores()
      const { authenStore, businessParametersSetupStore, t } = props
      const [id, setId] = useState("")
      const [password, setPassword] = useState("")
      const footName = authenStore.footName ? authenStore.footName : "IT SERVICE DESK CONTACT NUMBER IS 02-6xx-1234"
      const [colorID, setcolorID] = useState("#D3D3D3")
      const [colorPass, setcolorPass] = useState("#D3D3D3")
      useEffect(() => {
        i18n.changeLanguage("en")
        setcolorID("#D3D3D3")
        setcolorPass("#D3D3D3")
        return () => {
          // cleanup
        }
      }, [])

      useEffect(() => {
        return () => {
        }
      }, [businessParametersSetupStore.dataAxios])

      const _submitForm = () => {
        if (!id || !password) {
          setcolorID("red")
          setcolorPass("red")
          alert("Please entry id & password")
        }
        else {
          authenStore.setProfile(id, password)
          authenStore.setType("50")
          if (id.includes("customer")) {
            authenStore.setMenu(customerMenu)
          } else if (id.includes("admin")) {
            authenStore.setMenu(adminMenu)
          } else {
            authenStore.setMenu(userMenu)
          }
          Router.push("/")
        }
      }

      return (
        <Layout style={{ width: "100%", height: "100%" }}>
          <Layout>
            <Row>
              <Col span={24}>
                <Header style={{ height: "8vh", paddingLeft: 0, width: '100%', background: '#000000' }}>
                  <Row style={{ width: '100%' }} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Row justify="start" align="top">
                      <Col span="4" >
                        <WrapLogo>
                          <WrapperImageLogo src={logo02} />
                        </WrapLogo>
                      </Col>
                    </Row>
                    <Row justify="end" align="center" style={{ paddingLeft: "20%", width: '100%' }}>
                      <Col style={{ marginRight: 20 }} align="center">
                        <WrapperButtonAnt title={t("forNewWork")} />
                      </Col>
                      <Col align="center">
                        <WrapperButtonAnt title={t("support")} />
                      </Col>
                    </Row>
                  </Row>
                </Header>
              </Col>
            </Row>

            <Content style={{ height: "100%", background: "rgb(0,0,0)", backgroundImage: "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(62,62,62,1) 50%, rgba(112,112,112,1) 100%)" }}>

              <Row justify={"center"} style={{ position: 'absolute', left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
                <Col style={{ width: '100%', paddingTop: "5%" }}>
                  <Col><span style={{ fontSize: '3.3em', color: '#3C3A3A', marginLeft: '8%' }}>“Being human in the digital world</span></Col>
                  <Col><span style={{ fontSize: '3.3em', color: '#3C3A3A', marginLeft: '35%', position: 'absolute', zIndex: 100 }}>is about building a digital world for humans”</span></Col>
                </Col>
              </Row>

              <Row justify={"center"} align={"bottom"} style={{ height: "100%", overflow: 'hidden' }}>
                <BorderMainDiv align={"bottom"} style={{ width: "70%", background: 'black' }}>
                  <Col span={24} style={{ height: '100%', marginTop: "2%" }}>

                    <Row style={{ height: 20 }}></Row>
                    <Row align={"middle"} justify={"center"} span={24} style={{ width: '100%' }}>
                      <Row span={24} style={{ width: '100%' }}>
                        <Col span={12} offset={6} >

                          <Row span={24}>
                            <Col span={24}>
                              <span style={{ marginLeft: 5, fontSize: '2em', color: colorID }}>{(id ? "" : "*") + " " + (t("username"))}</span>
                              <MainInput value={id} onChange={e => {
                                if (id) setcolorID("#D3D3D3")
                                else setPassword("red")
                                setId(e.target.value)
                              }}></MainInput>
                            </Col>
                          </Row>

                          <Row span={24} style={{ marginTop: "10%" }}>
                            <Col span={24}>
                              <span style={{ marginLeft: 5, fontSize: '2em', color: colorPass }}>{(password ? "" : "*") + " " + (t("password"))}</span>
                              <MainInput type="password" value={password} onChange={e => {
                                if (password) setcolorPass("#D3D3D3")
                                else setPassword("red")
                                setPassword(e.target.value)
                              }}></MainInput>
                            </Col>
                          </Row>

                          <Row span={24} justify={'center'} style={{ marginTop: "10%" }}>
                            <Button style={{ margin: 5, background: '#707070', color: 'white', borderRadius: 5, minHeight: 50, width: "50%", alignSelf: 'center', textAlign: 'center', fontSize: '2em' }} onClick={() => _submitForm()}>{t("submit")}</Button>
                          </Row>
                        </Col>
                      </Row>
                    </Row>
                  </Col>
                </BorderMainDiv>
              </Row>
            </Content>

            <Footer style={{ background: '#000000', minHeight: "5vh" }}>
              <FooterText>{footName}</FooterText>
            </Footer>
          </Layout>

          <SideWrapperMain width={"20%"} style={{ zIndex: 0, width: "100%", height: '100%' }}>
            <WrapperImageBackgroundSignin src={background} />
          </SideWrapperMain>
        </Layout>
      )
    }))
export default withTranslation('common')(Signin)




