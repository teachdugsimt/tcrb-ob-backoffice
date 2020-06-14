import React, { useContext } from 'react'
import styled from 'styled-components';
import { Select } from 'antd';
const { Option } = Select;

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
