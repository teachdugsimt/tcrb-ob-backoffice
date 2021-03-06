import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import { PageHeader } from '../page-header';
import SearchBox from './search-box'
import { Row, Col } from 'antd'
import { withTranslation } from '../../i18n';

const SearchBar =
  inject('customerServicesMenuStore')
    (observer((props) => {
      const { t } = props
      return (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={12}>
            <PageHeader>Customer Services Enquiry</PageHeader>
          </Col>
          <Col className="gutter-row" span={12}>
            <SearchBox />
          </Col>
        </Row>
      )

    }))
export default withTranslation('common')(SearchBar)
