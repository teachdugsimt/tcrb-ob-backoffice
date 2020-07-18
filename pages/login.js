import Signin from '../components/singin/signin'
import { withTranslation } from '../i18n'
const Login = (props) => {
  const { t } = props
  return <Signin />
}

Login.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(Login)

