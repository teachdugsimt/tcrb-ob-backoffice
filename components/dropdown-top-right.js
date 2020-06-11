import { Select } from 'antd';
import { i18n, withNamespaces } from '../i18n'

const { Option } = Select;

function handleChange(value) {
  if (value == "en") {
    i18n.changeLanguage('en')
  } else if (value == "th") {
    i18n.changeLanguage('th')
  }
  console.log(`selected ${value}`);
}

const DropdownTopRight = (props) => {
  return (
    <div style={{ marginRight: 10, display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'flex-end', width: "100%" }}>
      <Select defaultValue="Digital Back Office Master" style={{ flex: 0.137, backgroundColor: "#707070" }} onChange={handleChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
        <Option value="en">EN</Option>
        <Option value="th">TH</Option>
      </Select>
    </div>)
}

export default DropdownTopRight
