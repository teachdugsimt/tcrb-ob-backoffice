import React, { useState } from 'react'
import styled from 'styled-components';
import { PageHeader } from '../components/page-header';
import { Row, Col } from 'antd'
import { withTranslation } from '../i18n'
import { palette } from '../theme'
import { Button } from 'antd'
import TableProduct from '../components/product-onboard/table-product'
import AddNewProduct from '../components/product-onboard/add-new-product'
const ProductOnboarding = (props) => {
  const [addProduct, setAddProduct] = useState(false)
  const { t } = props
  console.log(addProduct)
  return (
    <Row>
      {!addProduct ?
        <Col style={{ width: '100%' }}>
          <PageHeader>Product Onboarding</PageHeader>
          <Button type="primary" onClick={() => setAddProduct(true)}>Add new Product</Button>
          <TableProduct />
        </Col>
        : <div style={{ display: 'flex', flex: 1 }}>
          <AddNewProduct />
        </div>
      }
    </Row>

  )
}

ProductOnboarding.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(ProductOnboarding)
