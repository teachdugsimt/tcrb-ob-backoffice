import { Input, Row, Col, Layout, Modal, Tabs, Spin } from 'antd'
import styled from 'styled-components';

const MainTab = styled(Tabs)`
    .ant-tabs-tab-active{
      color: ${({ theme }) => theme.colors.palette.orange}; ;
    }
    .ant-tabs-tab:hover{
      color: ${({ theme }) => theme.colors.palette.orange}; ;
    }
    .ant-tabs-ink-bar {
      background: ${({ theme }) => theme.colors.palette.orange};
    }
    .ant-btn {
      background: ${({ theme }) => theme.colors.palette.orange}; ;
      border-color: ${({ theme }) => theme.colors.palette.orange}; ;
    }
`

export {
  MainTab,
}
