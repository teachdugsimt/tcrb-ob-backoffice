import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import Link from 'next/link'
import { useStores } from '../hooks/use-stores'

const Dashboard = observer((props) => {
  const { authenStore } = useStores()

  return <div>
    Dashboard Screen
    <h1>{authenStore.id}</h1>
    <h1>{authenStore.password}</h1>
    <Link href="/"><a>Go back</a></Link>
  </div>
})

export default Dashboard
