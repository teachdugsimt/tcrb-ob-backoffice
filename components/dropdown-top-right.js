import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
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
      </Select>
    </div>)
}

export default DropdownTopRight
