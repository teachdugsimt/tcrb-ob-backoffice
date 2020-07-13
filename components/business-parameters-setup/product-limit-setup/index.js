import React, { useState, useEffect } from 'react'
import { withTranslation } from '../../../i18n'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import ProductList from './product-list'
import ManagePartner from './manage-partner'
import AddPartner from './add-partner'

const ProductLimitSetup =
  inject('businessParametersSetupStore')
    (observer((props) => {
      const { businessParametersSetupStore, t } = props
      const [viewProductList, setViewProductList] = useState(true)
      const [viewDetailProduct, setViewDetailProduct] = useState(false)
      const [viewSpecificProduct, setViewSpecificProduct] = useState(false)

      useEffect(() => {
        if (businessParametersSetupStore.nextPageIsProductList) {
          setViewProductList(true)
          setViewSpecificProduct(false)
          setViewDetailProduct(false)
        }
      }, [businessParametersSetupStore.nextPageIsProductList]);


      useEffect(() => {
        if (businessParametersSetupStore.productLimitDetail != null) {
          setViewDetailProduct(true)
        }
      }, [businessParametersSetupStore.productLimitDetail])

      useEffect(() => {
        if (businessParametersSetupStore.goBack) {
          setViewDetailProduct(false)
          setViewSpecificProduct(false)
          businessParametersSetupStore.goBack = false
          businessParametersSetupStore.productLimitDetail = null
          businessParametersSetupStore.nextPageIsAddPartner = null

        }
      }, [businessParametersSetupStore.goBack])


      useEffect(() => {
        if (businessParametersSetupStore.nextPageIsAddPartner) {
          setViewSpecificProduct(true)
        }
      }, [businessParametersSetupStore.nextPageIsAddPartner])

      return (viewDetailProduct) ? <ManagePartner /> : (viewSpecificProduct ? <AddPartner /> : <ProductList />)


    }
    ))
export default withTranslation('common')(ProductLimitSetup)
