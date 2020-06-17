import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import { PageHeader } from '../page-header';
import { SearchBox } from './search-box'

export const SearchBar =
  inject('customerServicesMenuStore')
    (observer((props) => {

      return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <PageHeader>Customer Services Enquiry</PageHeader>
          <SearchBox />
        </div>
      )

    }))
