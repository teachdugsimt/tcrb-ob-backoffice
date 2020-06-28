import { Input, Row, Col, Layout, Modal, Tabs, Spin, Button, Switch, Popconfirm } from 'antd'
import styled from 'styled-components';

const TcrbTab = styled(Tabs)`
    .ant-tabs-tab-active{
      color: ${({ theme }) => theme.colors.palette.orange};
    }
    .ant-tabs-tab:hover{
      color: ${({ theme }) => theme.colors.palette.orange};
    }
    .ant-tabs-ink-bar {
      background: ${({ theme }) => theme.colors.palette.orange};
    }
`

const TcrbSwitch = styled(Switch)`
  ${({ defaultChecked }) => defaultChecked && `
        background-color: #FBA928;
    `}
`
const TcrbButton = styled(Button)`
  ${({ className, theme }) => className == 'default' && `
        background-color: ${theme.colors.default};
        border-color: ${theme.colors.default};
        color:${theme.colors.white};
        &:hover{
          background-color: ${theme.colors.defaultDarker};
          border-color: ${theme.colors.defaultDarker};
          color:${theme.colors.white};
        }
        &:focus{
          background-color: ${theme.colors.defaultDarker};
          border-color: ${theme.colors.defaultDarker};
          color:${theme.colors.white};
        }
    `}

    ${({ className, theme }) => className == 'primary' && `
        background-color: ${theme.colors.primary};
        border-color: ${theme.colors.primary};
        color:${theme.colors.white};
        &:hover{
          background-color: ${theme.colors.primaryDarker};
          border-color: ${theme.colors.primaryDarker};
          color:${theme.colors.white};
        }
        &:focus{
          background-color: ${theme.colors.primaryDarker};
          border-color: ${theme.colors.primaryDarker};
          color:${theme.colors.white};
        }
    `}
`

const TcrbModal = styled(Modal)`
  .ant-modal-header{
    background-color: ${({ theme }) => theme.colors.primaryBlue};
    color: ${({ theme }) => theme.colors.white};
  }
  .ant-modal-title{
    color: ${({ theme }) => theme.colors.white};
  }
  .ant-modal-close-x{
    color: ${({ theme }) => theme.colors.white};
  }
`

const TcrbPopconfirm = styled(Popconfirm)`
    color: ${({ theme }) => theme.colors.primary};
    &:hover{
      color: ${({ theme }) => theme.colors.primaryDarker};
    }

  .ant-btn-primary{
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color:${({ theme }) => theme.colors.white};
  }
  .ant-popover{
    background: red
  }
  .ant-popover-content{
    .ant-popover-inner-content{
      background-color:red;
        .ant-btn-primary{
          background-color: ${({ theme }) => theme.colors.primary};
          border-color: ${({ theme }) => theme.colors.primary};
          color:${({ theme }) => theme.colors.white};
        }
    }
  }
`

export {
  TcrbTab,
  TcrbSwitch,
  TcrbButton,
  TcrbModal,
  TcrbPopconfirm
}
