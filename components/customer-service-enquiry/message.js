import { message, Button } from 'antd';
// import { withTranslation } from '../../i18n'


const Message = (props) => {

  const info = () => {
    message.info(props.message);
  }

  return <Button type="primary" onClick={info}>
    {props.message}
  </Button>
}

export default (Message)
