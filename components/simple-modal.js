import React from 'react'
import { Input, Row, Col, Layout, Modal, Switch } from 'antd'
import { i18n, withNamespaces, withTranslation } from '../i18n'
import { TcrbButton, TcrbModal } from '../components/antd-styles/styles'
// import { JsonToTable } from "react-json-to-table";
// import { JsonTable } from 'react-json-table'

export default function SimpleModal(props) {
  return (
    <div>
      <TcrbModal
        title={i18n.t(props.title)}
        visible={props.visible}
        width={props.width || 520}
        onOk={() => props.onOk()}
        onCancel={() => props.onCancel()}
        footer={[
          <TcrbButton key="cancel" onClick={() => props.onCancel()} className="default">
            {props.textCancel}
          </TcrbButton>,

          props.type == "confirm" && (<TcrbButton key="submit" type="primary" className="primary" onClick={() => props.onOk()}>
            {props.textOk}
          </TcrbButton>),
          props.type == "request" && (<TcrbButton key="submit" type="primary" loading={props.fetching} onClick={() => props.onOk()}>
            {props.textOk}
          </TcrbButton>),
        ]}
      >
        {/* <JsonToTable json={JSON.parse(props.modalString)} /> */}
        {/* <JsonTable rows={JSON.parse(props.modalString)} /> */}
        {typeof props.modalString === 'string' ? <div dangerouslySetInnerHTML={{ __html: props.modalString }} /> : props.modalString}
      </TcrbModal>
    </div>
  )
}
