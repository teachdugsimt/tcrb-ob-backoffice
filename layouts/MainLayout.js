import React from 'react'
import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminFooter from './AdminFooter'
import { withRouter } from 'next/router'
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
            <Content style={{ marginTop: spacing.tiny - 8, borderRadius: spacing.tiny, backgroundColor: 'white', height: '97%', overflowY: 'scroll', }}>
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
