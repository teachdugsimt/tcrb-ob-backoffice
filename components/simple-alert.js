import React from 'react'
import { Alert } from 'antd'

export default function SimpleAlert(props) {
  return (
    <div>
      <Alert message={props.message}
        type="error" showIcon />
    </div>
  )
}
