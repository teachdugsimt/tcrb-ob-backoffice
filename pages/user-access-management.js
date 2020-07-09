import React from 'react'
import UseAccessManagement from '../components/user-access-management'
import { withTranslation } from '../i18n'
const UserAccessManagement = () => {
  return (
    <div>
      <UseAccessManagement />
    </div>
  )
}
UserAccessManagement.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(UserAccessManagement)
