import React from 'react'
import { Alert } from 'antd'
import { withTranslation } from '../i18n'
function SimpleAlert(props) {
  return (
    <div>
      <Alert message={props.message}
        type="error" showIcon />
    </div>
  )
}

export default withTranslation('common')(SimpleAlert)
