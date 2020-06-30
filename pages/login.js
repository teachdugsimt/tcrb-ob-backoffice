import Signin from '../components/singin/signin'
import { withTranslation } from '../i18n'
const Login = () => {
  return <Signin />
}

Login.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation()(Login)

