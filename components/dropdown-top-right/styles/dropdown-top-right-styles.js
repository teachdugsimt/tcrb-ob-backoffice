import React, { useContext } from 'react'
import styled from 'styled-components';
import { useStores } from '../../../hooks/use-stores'
import { Select } from 'antd';
const { Option } = Select;

const width = () => {
  const { versatileStore } = useStores()
  return versatileStore.sidebarWidth
}

const DropdownContainer = styled.div`
margin-right: ${({ theme }) => theme.spacing.medium}px;;
display: flex;
flex: 1;
flex-direction: row;
justify-content: flex-end;
width: 100%;
`

export {
  DropdownContainer,
}
