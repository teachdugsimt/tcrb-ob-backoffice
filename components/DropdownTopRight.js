import { Select } from 'antd';

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const DropdownTopRight = (props) => {
  return (
    <div>
      <Select defaultValue="Digital Back Office Master" style={{ width: 120 }} onChange={handleChange}>
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
