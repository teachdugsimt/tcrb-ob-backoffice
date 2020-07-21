import React from 'react'
import { withTranslation } from '../i18n'
import DashBoardAndReports from '../components/dashboard-and-report'
const DashBoardAndReport = (props) => {
  const { t } = props

  return (
    <div>
      <DashBoardAndReports />
    </div>
  )
}

DashBoardAndReport.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(DashBoardAndReport)
