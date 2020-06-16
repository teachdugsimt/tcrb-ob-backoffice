import { Select } from 'antd';
import { i18n, withNamespaces, withTranslation } from '../../i18n'
import { DropdownContainer } from './styles/dropdown-top-right-styles'
import { spacing } from '../../theme/spacing'
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
    <DropdownContainer>

      <Select defaultValue={"Language"} style={{ flex: 0.137, marginRight: spacing.medium }} onChange={handleChange}>
        <Option value="en">EN</Option>
        <Option value="th">TH</Option>
      </Select>

      <Select defaultValue={"Digital Back Office Master"} style={{ flex: 0.137 }} onChange={handleChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>
          Disabled
        </Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>

    </DropdownContainer>)
}

DropdownTopRight.getInitialProps = async () => ({
  namespacesRequired: ['DropdownTopRight', 'digitalBackOfficeMaster', 'language'],
})
export default withTranslation('DropdownTopRight')(DropdownTopRight)
