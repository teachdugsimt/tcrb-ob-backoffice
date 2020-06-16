import React from 'react'
import { Input, Row, Col, Layout, Modal, Switch } from 'antd'
import { i18n, withNamespaces } from '../i18n'

export default function SimpleModal(props) {
  return (
    <div>
      <Modal
        title={i18n.t("confirm")}
        visible={props.visible}
        onOk={() => props.onOk()}
        onCancel={() => props.onCancel()}
        okText={i18n.t("confirm")}
        cancelText={i18n.t("cancel")}
      >
        {props.modalString}
      </Modal>
    </div>
  )
}
