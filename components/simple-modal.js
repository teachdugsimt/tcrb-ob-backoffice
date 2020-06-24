import React from 'react'
import { Input, Row, Col, Layout, Modal, Switch, Button } from 'antd'
import { i18n, withNamespaces } from '../i18n'

export default function SimpleModal(props) {
  return (
    <div>
      <Modal

        title={i18n.t(props.title)}
        visible={props.visible}
        onOk={() => props.onOk()}
        onCancel={() => props.onCancel()}
        footer={[
          props.type == "error" && (<Button key="cancel" onClick={() => props.onCancel()}>
            {props.textCancel}
          </Button>),
          props.type == "close" && (<Button key="cancel" onClick={() => props.onCancel()}>
            {props.textCancel}
          </Button>),
          props.type == "confirm" && (<Button key="submit" type="primary" onClick={() => props.onOk()}>
            {props.textOk}
          </Button>),
        ]}
      >
        {props.modalString}
      </Modal>
    </div >
  )
}
