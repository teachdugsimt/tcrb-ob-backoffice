import { withTranslation, namespacesRequired } from '../i18n'
const Custom404 = (props) => {
  const {t} = props
  return <h1>{t("notFoundPage")}</h1>
}

export default withTranslation('common')(Custom404)
