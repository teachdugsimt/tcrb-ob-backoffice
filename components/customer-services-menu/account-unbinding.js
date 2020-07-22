import React, { useState, useEffect } from 'react'
import SimpleSearch from '../simple-search'
import SimpleSwitch from '../simple-switch'
import styled from 'styled-components'
import { Row, Switch, Col, Button, Input, Alert, Modal } from 'antd';
import SimpleModal from '../simple-modal'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx';
import { withTranslation } from '../../i18n'
import { TcrbSwitch } from '../antd-styles/styles'
import { isEmpty } from '../data-utility'

const StyledA = styled.a`
  display: initial;
  padding-right: ${({ theme }) => theme.spacing.medium}px !important;
  color: #F88008 !important;
  text-decoration-color: #F88008;
  text-decoration-line: underline;
`
const StyledP = styled.p`
  display: initial;
  padding-left: ${({ theme }) => theme.spacing.medium}px !important;
`
const StyledSpan = styled.span`

  display: initial;
  padding-left: ${({ theme }) => theme.spacing.medium}px !important;
`
const StyledInput = styled(Input)`
      ${({ readOnly }) => readOnly && `
          border-style: solid !important;
          border-width: 0px 0px 1px 0px !important;
          border-color: black !important;
          box-shadow: none !important;
          border-right-style: unset !important;
          border-right-width: 0px !important
      `}
`
const AccountUnbinding =
  inject('customerServicesMenuStore')
    (observer((props) => {
      const [isSearch, setIsSearch] = useState(false);
      const [viewDetail, setViewDetail] = useState(false);
      const [visible, setVisible] = useState(false)
      const [modalType, setModalType] = useState('confirm')
      const [modalTitle, setModalTitle] = useState('')
      const [titleModal, setTitleModal] = useState('')
      const [modalString, setModalString] = useState('')
      const [accountId, setAccountId] = useState('')
      const [stringAccount, setStringAccount] = useState([])
      const [stringSwitch, setStringSwitch] = useState([])
      const { customerServicesMenuStore, t } = props

      useEffect(() => {
        if (isSearch) {
          setStringAccount(customerServicesMenuStore.accountInfo)
        }
      }, [customerServicesMenuStore.accountInfo])

      useEffect(() => {
        customerServicesMenuStore.accountInfoError = null
      }, [])

      useEffect(() => {
        if (isSearch) {
          if (customerServicesMenuStore.unbindAccountInfo) {
            console.log(toJS(customerServicesMenuStore.unbindAccountInfo))
            convertArrayObjectToArray(toJS(customerServicesMenuStore.unbindAccountInfo)).then(result => {
              console.log(result)
              customerServicesMenuStore.arrayUnbindAccountInfo = result
              setStringSwitch(result)
            })
          }
        }
      }, [customerServicesMenuStore.unbindAccountInfo])

      const searchIdCardNumber = async (value) => {
        if (isEmpty(value)) {
          Modal.warning({
            title: 'Warning.',
            content: 'Please Enter ID Card Number.',
          })
        } else {
          setIsSearch(true)
          customerServicesMenuStore.getDataAccountUnbind(value)
        }
        /* setIsSearch(true)
        customerServicesMenuStore.getDataAccountUnbind(value) */

      }

      const backSearch = async () => {
        setViewDetail(false)
        setIsSearch(false)
        setStringAccount([])
      }

      const convertArrayObjectToArray = (arrayObject) => {
        console.log(arrayObject)
        return new Promise((resolve, reject) => {
          if (Array.isArray(arrayObject)) {
            let result = arrayObject.map(accountDetail =>
              [(accountDetail.binding_status == '1' || accountDetail.binding_status == '2') ? true : false, accountDetail.partner_name_english]);
            resolve(result)
          } else {
            resolve([])
          }
        })

      }

      const selectAccount = (selectedAccount) => {
        console.log(toJS(selectedAccount))
        customerServicesMenuStore.setAccountId(selectedAccount.main_account_no)
        customerServicesMenuStore.getDataPartnerInfo(selectedAccount.main_account_no)
        setViewDetail(true)

      }
      const onChange = (switchSelected, index) => {
        console.log("indexOf :" + index, switchSelected)
        console.log(toJS(customerServicesMenuStore.unbindAccountInfo[index]))
        let accountSelected = customerServicesMenuStore.unbindAccountInfo[index]
        customerServicesMenuStore.accountSelected = accountSelected
        if (switchSelected === true) {
          setModalTitle('Confirm to Unbinding Account.')
          setModalString(
            <div style={{ textAlign: "center" }}>
              <p>{t("unbinding")}</p>
              <p> {t("account") + " " + accountSelected.main_account_no} from {accountSelected.partner_abbreviation}</p>
            </div>
          )
          setVisible(true)
        } else {
        }
      }

      const unBindingAccount = async () => {
        setVisible(false)
        // call api
        await customerServicesMenuStore.submitAccountUnbiding()
      }


      const AccountList = () => {

        const listItems = stringAccount.map((string, index) => {
          let product_name = string.products.map(e => e.product_name_english)
          return (
            <Row key={index} gutter={[4, 24]}>
              <Col span={24}>
                <StyledA onClick={() => { selectAccount(string) }}>{string.main_account_no}</StyledA>
                <StyledSpan>{product_name.join(' ' + ',' + ' ')}</StyledSpan>
              </Col>
            </Row>
          )
        })

        return (
          <ul style={{ paddingInlineStart: 0 }}>{listItems}</ul>
        );
      }
      const newSearch = () => {
        console.log(customerServicesMenuStore.accountInfoError)

        return (
          <div style={{ margin: 20 }}>
            <Row gutter={[4, 24]}>
              <SimpleSearch search={searchIdCardNumber} prefixWording={t("idCard")} />
            </Row>
            <Row gutter={[16, 24]}>
              <Col span={9}>
                <div style={{}}>
                  {customerServicesMenuStore.accountInfoError && <Alert
                    message={customerServicesMenuStore.accountInfoError}
                    description={''}
                    type="error"
                    closable
                    onClose={() => customerServicesMenuStore.accountInfoError = null}
                  />
                  }
                </div>
              </Col>
            </Row>
            {(isSearch) ? (
              <AccountList />
            ) : ('')}
          </div>)
      }

      const accountDetail = (
        <div style={{ margin: 20 }}>

          <Row gutter={[4, 24]} align="top">
            <Col >
              <StyledInput readOnly={true} prefix={t('accountNumber')} defaultValue={customerServicesMenuStore.accountId} />
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col span={9}>
              <div style={{}}>
                {customerServicesMenuStore.accountInfoError && <Alert
                  message={customerServicesMenuStore.accountInfoError}
                  description={''}
                  type="error"
                  closable
                  onClose={() => customerServicesMenuStore.accountInfoError = null}
                />
                }
              </div>
            </Col>
          </Row>

          <Row gutter={[4, 24]} align="middle">
            <SimpleSwitch
              data={stringSwitch}
              onChange={(switchSelected, index) => onChange(switchSelected, index)}
              isBinding={true}
            />

            <SimpleModal
              title={modalTitle}
              type={modalType}
              onOk={() => unBindingAccount()}
              onCancel={() => setVisible(false)}
              textCancel={'Cancel'}
              textOk={'Confirm'}
              modalString={modalString}
              visible={visible}
            />

          </Row>

          <Row gutter={[4, 24]} align="bottom" justify="center">
            <Col span={6}>
              <Button shape="round" onClick={() => backSearch()}>Back</Button>

            </Col>
          </Row>
        </div>
      )
      return (viewDetail) ? accountDetail : newSearch()
    }))
export default withTranslation('common')(AccountUnbinding)
