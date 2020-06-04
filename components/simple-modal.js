import React from 'react'
import { Input, Row, Col, Layout, Modal, Switch } from 'antd'

export default function SimpleModal(props) {
  return (
    <div>
      <Modal
        title="Confirm"
        visible={props.visible}
        onOk={()=> props.onOk()}
        onCancel={() => props.onCancel(false)}
        okText="Confirm"
        cancelText="Cancel"
      >
      {props.modalString}
      </Modal>
    </div>
  )
}
