import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import { Button, Row, Col, PageHeader, Modal } from 'antd'
import { TcrbSpin } from '../antd-styles/styles'
import TableProduct from './table-product'
import FormModalProductOnboard from './form-modal-product'
import ManageProduct from './manage-product'
const ProductOnboard =
  inject('productOnboardStore')
    (observer((props) => {
      const { productOnboardStore } = props
      const [isViewManageProductOnBoard, setIsViewManageDepartment] = useState(false)
      const [visibleFormModalAddNewProductOnBoard, setVisibleFormModalAddNewProductOnBoard] = useState(false)

      useEffect(() => {
        if (productOnboardStore.nextPageIsManageProductOnBoard === true) {
          setIsViewManageDepartment(true)
        } else {
          console.log('goback')
          setIsViewManageDepartment(false)
        }
      }, [productOnboardStore.nextPageIsManageProductOnBoard])

      useEffect(() => {
        if (productOnboardStore.responseApiError === true) {
          openModalError()
        }

      }, [productOnboardStore.responseApiError])

      const onCreate = (values) => {
        setVisibleFormModalAddNewProductOnBoard(false)
        console.log(values)
        productOnboardStore.submitAddNewProduct(values)
      }

      const openModalError = () => {
        Modal.error({
          title: productOnboardStore.responseErrorMessage.title,
          content: productOnboardStore.responseErrorMessage.body,
          onOk() {
            productOnboardStore.responseApiError = false
          },
        });
      }
      return (
        <div>
          <TcrbSpin spinning={productOnboardStore.apiFetching} size="large" tip="Loading..." >
            <Row>
              {isViewManageProductOnBoard ?
                <Col flex={100}>
                  <ManageProduct />
                </Col>
                : <Col flex={100}>
                  <PageHeader title="Product Onboarding" />
                  <Button type="primary" onClick={() => setVisibleFormModalAddNewProductOnBoard(true)}>Add new product</Button>
                  <TableProduct />
                </Col>
              }
            </Row>
            <FormModalProductOnboard
              visible={visibleFormModalAddNewProductOnBoard}
              onCreate={onCreate}
              onCancel={() => {
                setVisibleFormModalAddNewProductOnBoard(false);
              }}
            />
          </TcrbSpin>
        </div>
      )
    }
    ))
export default ProductOnboard
