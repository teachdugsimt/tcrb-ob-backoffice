import { orange, green, gold } from '@ant-design/colors';
import { TcrbButton, TcrbPopconfirm } from '../antd-styles/styles'

const addKeyToDataSource = (arrayDataSource) => {
  let newDataSource = arrayDataSource
  for (let index = 0; index < newDataSource.length; index++) {
    newDataSource[index].key = index + 1;
  }
  return new Promise((resolve) => {
    resolve(newDataSource)
  })
}
const addCommaInData = (text, isComma) => {
  let stringToNumber = new Number(text)
  if (isNaN(stringToNumber)) {
    return <span>{text}</span>
  } else {
    if (isComma) {
      let customText = stringToNumber.toLocaleString()
      return <p style={{ textAlign: "right", margin: 0 }}>{customText}</p>
    } else {
      return <span>{text}</span>
    }
  }
}

const checkDefaultStatus = (request_status) => {
  if (request_status == 'APPROVE') {
    return <span style={{ color: green[6] }}>Active</span>
  } else if (request_status == 'PENDING') {
    return <span style={{ color: gold[6] }}>Pending</span>
  } else {
    return null
  }
}

const renderAction = (record, props) => {
  if (record.status === '1') {
    return (
      <div style={{ textAlign: "center" }}>
        <TcrbPopconfirm title="Sure to Edit?" onConfirm={() => props(record)}>
          <a style={{ marginRight: 8 }}>Edit</a>

        </TcrbPopconfirm>
        <TcrbPopconfirm title="Sure to Deactivate?" >
          <a style={{ color: '#FBA928' }}>Deactivate</a>
        </TcrbPopconfirm>
      </div>
    )

  } else if (record.status === '2') {
    return null
  } else {
    return null
  }
}
export {
  addKeyToDataSource,
  addCommaInData,
  checkDefaultStatus,
  renderAction
}
