import React from 'react'
import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminFooter from './AdminFooter'
import { withRouter, useRouter } from 'next/router'
import {
  FirstLayer, SecondLayer, EmptyDiv, EmptySidebar, ContentPadding, WrapperImageBackground,
  ContentSubDiv
} from './Styles/AdminHocStyles'
import { inject, observer } from 'mobx-react'
// import { useStores } from '../hooks/use-stores'
import backgroundImage from '../images/background.png'
import { spacing } from '../theme/spacing'
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import { i18n, Link, withTranslation } from '../i18n'

const { Content } = Layout;

const MainLayout = inject('versatileStore')(observer((props) => {
  // const { versatileStore } = useStores()
  const { versatileStore } = props
  const router = useRouter()
  let all_height
  if (router.pathname == "/customer-service-enquiry") all_height = '97%'
  else if (router.pathname == "/pending-approve") all_height = '97%'
  else if (router.pathname == "/partner-management") all_height = '95.2%'
  else if (router.pathname == "/fee-settlement-setup") all_height = '95.2%'
  else all_height = '97%'
  return (
    <FirstLayer>
      <Layout>
        <WrapperImageBackground src={backgroundImage} />
        <AdminHeader />
        <EmptyDiv />
        {/* <Row> */}
        <Layout>
          <AdminMenu />
          <EmptySidebar />

          {/* <Col span={24} height={'100%'} style={{ height: '100%'}}> */}
          <ContentPadding style={{ paddingLeft: versatileStore.sidebarWidth > 100 ? spacing.full : spacing.pass }}>
            <Content style={{
              marginTop: spacing.tiny - 8, borderRadius: spacing.tiny, backgroundColor: 'white',
              maxHeight: all_height,
              minHeight: all_height,
              overflowY: 'scroll',
            }}>
              <ContentSubDiv>
                {props.children}
              </ContentSubDiv>
            </Content>
          </ContentPadding>
          {/* </Col> */}
          {/* </Row> */}
        </Layout>
        <AdminFooter />
      </Layout>
    </FirstLayer>
  )
}))

MainLayout.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default
  // withRouter(
  withTranslation('common')
    (MainLayout)
// )
// HTTPS=true SSL_CRT_FILE=Certificate_chain.txt SSL_KEY_FILE=private_key.txt npm run dev
