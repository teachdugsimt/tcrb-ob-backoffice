import { message, Button, Modal, Alert } from 'antd';
// import { withTranslation } from '../../i18n'


const Message = (props) => {
  console.log(props)
  return (

    <Alert
      style={{ marginBottom: 10 }}
      message="Error"
      description={props.message}
      type="error"
      showIcon
    // closable
    />

  )
}

export default (Message)


