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
import { Layout, Menu, Breadcrumb } from 'antd';

const { Content } = Layout;

const MainLayout = inject('versatileStore')(observer((props) => {
  // const { versatileStore } = useStores()
  const { versatileStore } = props
  const router = useRouter()
  let all_height
  if (router.pathname == "/customer-service-enquiry") all_height = '95.25%'
  else if (router.pathname == "/pending-approve") all_height = '97%'
  else all_height = '97%'
  return (
    <FirstLayer>
      <Layout>
        <WrapperImageBackground src={backgroundImage} />
        <AdminHeader />
        <EmptyDiv />
        <Layout>
          <AdminMenu />
          <EmptySidebar />
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
        </Layout>
        <AdminFooter />
      </Layout>
    </FirstLayer>
  )
}))

export default withRouter(MainLayout)
// HTTPS=true SSL_CRT_FILE=Certificate_chain.txt SSL_KEY_FILE=private_key.txt npm run dev
