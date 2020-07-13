import React, { useEffect } from 'react'
import { Input, Button } from 'antd'
import styled from 'styled-components';
import { withTranslation } from '../i18n'

const { Search } = Input;

const StyledSearch = styled(Search)`
.ant-input-affix-wrapper{
  border-style: solid !important;
  border-width: 0px 0px 1px 0px !important;
  border-color: black !important;
  box-shadow: none !important;
},
.ant-input-affix-wrapper:hover{
  border-right-width: 0px !important
}
.ant-input-prefix {
  margin-right: ${({ theme }) => theme.spacing.large}px !important;
}
.ant-btn-primary{
  background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border-color: ${({ theme }) => theme.colors.primary};
    &:hover{
      background-color: ${({ theme }) => theme.colors.primaryDarker};
    }
}

`


function SimpleSearch(props) {
  const { t } = props
  return (
    <div>
      <StyledSearch
        prefix={props.prefixWording}
        placeholder={t("inputIdCard")}
        enterButton="Search"
        size="large"
        disabled={props.disabled}
        onSearch={value => props.search(value)}
        onChange={() => console.log('change')}
        defaultValue={props.defaultValue}
        loading={props.loading}
      />
      {/* <RegSearch /> */}
    </div>
  )
}

export default withTranslation('common')(SimpleSearch)
