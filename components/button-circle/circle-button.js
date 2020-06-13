import { Button, Radio } from 'antd';
import { DownloadOutlined, RightCircleFilled } from '@ant-design/icons';

const circleButton = (props) => {
  // shape : round, circle
  // type : primary, link
  // size : large,
  return <Button type={props.type} shape={props.shape}
    icon={<RightCircleFilled />}
    size={props.size}
    onClick={props.onClick}
    loading={props.loading}
  >
    {props.title}
  </Button>
}

export default circleButton
