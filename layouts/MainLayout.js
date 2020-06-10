import React, { Component, useContext, useEffect, useState, useMemo } from 'react'
import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import AdminFooter from './AdminFooter'
import { withRouter } from 'next/router'
import { FirstLayer, SecondLayer, EmptyDiv, EmptySidebar, ContentPadding, WrapperImageBackground } from './Styles/AdminHocStyles'
import { observer } from 'mobx-react'
import { useStores } from '../hooks/use-stores'
import backgroundImage from '../images/background.png'

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

const MainLayout = (observer((props) => {
  const [width, setWidth] = useState(288)
  const { versatileStore } = useStores()
  useEffect(() => {
    return () => {
      // clean up
    }
  }, [versatileStore.sidebarWidth])

  return (
    <FirstLayer>
      <Layout>
        <WrapperImageBackground src={backgroundImage} />
        <AdminHeader />
        <EmptyDiv />
        <Layout>
          <AdminMenu />
          <EmptySidebar />
          <ContentPadding style={{ paddingLeft: versatileStore.sidebarWidth > 100 ? 312 : 98 }}>
            <Content style={{ backgroundColor: 'white', height: '97%', overflowY: 'scroll', marginTop: -10 }}>
              {props.children}
            </Content>
          </ContentPadding>
        </Layout>
        <AdminFooter />
      </Layout>
    </FirstLayer>
  )
}))

export default withRouter(MainLayout)





















// import React, { Component, useContext, useEffect, useState, useMemo } from 'react'
// import AdminHeader from './AdminHeader'
// import AdminMenu from './AdminMenu'
// import AdminFooter from './AdminFooter'
// import { withRouter } from 'next/router'
// import { FirstLayer, SecondLayer, EmptyDiv, EmptySidebar, ContentPadding, WrapperImageBackground } from './Styles/AdminHocStyles'
// import { observer } from 'mobx-react'
// import { useStores } from '../hooks/use-stores'
// import backgroundImage from '../images/background.png'
// import { Layout } from 'antd';
// const { Header, Footer, Sider, Content } = Layout;

// const MainLayout = (observer((props) => {
//   const [width, setWidth] = useState(288)
//   const { versatileStore } = useStores()
//   useEffect(() => {
//     return () => {
//       // clean up
//     }
//   }, [versatileStore.sidebarWidth])

//   return (
//     <FirstLayer>
//       <WrapperImageBackground src={backgroundImage} />
//       <AdminHeader />
//       <EmptyDiv />
//       <SecondLayer>
//         <AdminMenu />
//         <EmptySidebar style={{ paddingLeft: versatileStore.sidebarWidth > 100 ? 288 : 74 }} />
//         <ContentPadding>
//           <div style={{ backgroundColor: '#FFFFFF', width: "100%", height: '100%', marginTop: -15 }}>
//             <div style={{ height: "100%", overflowY: 'scroll' }}>
//               {props.children}
//             </div>
//           </div>
//         </ContentPadding>
//       </SecondLayer>
//       <AdminFooter />
//     </FirstLayer>

//   )
// }))

// export default withRouter(MainLayout)
