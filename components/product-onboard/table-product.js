import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import { toJS } from 'mobx'
import { Table, Tag, Space } from 'antd'
import { withTranslation } from '../../i18n'
import { productColumns } from './table-column'
import { addKeyToDataSource } from '../data-utility'

const TableProduct =
  inject('productOnboardStore')
    (observer((props) => {
      const [dataSourceProduct, setDataSourceProduct] = useState([])
      const { productOnboardStore } = props

      useEffect(() => {
        productOnboardStore.getDataProductList()
      }, [])

      useEffect(() => {
        if (productOnboardStore.productList.length >= 0) {
          addKeyToDataSource(productOnboardStore.productList).then(result => {
            setDataSourceProduct(result)
          })
        }
      }, [productOnboardStore.productList])

      const deleteProductSelect = (record) => {
        console.log(toJS(record))
      }
      const viewManageProduct = (record) => {
        productOnboardStore.getDataProductDetail(record.product_code)
        // productOnboardStore.getDataProductServiceList(productOnboardStore.productDetailSelected.product_code)

        // productOnboardStore.productSelected = record
        productOnboardStore.nextPageIsManageProductOnBoard = true
      }
      return (
        <div style={{ paddingTop: 20 }}>
          <Table
            columns={productColumns(viewManageProduct, deleteProductSelect)}
            dataSource={dataSourceProduct}
            size="small"
          />
        </div>
      )
    }))
export default withTranslation('common')(TableProduct)
