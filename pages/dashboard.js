import React, { useContext } from 'react'
import { inject, observer } from 'mobx-react'
import Link from 'next/link'
import { withTranslation } from '../i18n'

const Dashboard =
  inject('authenStore')
    (observer((props) => {
      // const { authenStore } = useStores()
      const { authenStore } = props

      return <div>
        Dashboard Screen
      <h1>{authenStore.id}</h1>
        <h1>{authenStore.password}</h1>
        <Link href="/"><a>Go back</a></Link>
      </div>
    }))

Dashboard.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation()(Dashboard)
