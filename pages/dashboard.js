import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import TestStore3 from '../mobx-store/TestStore3'
import Link from 'next/link'

const Dashboard = observer((props) => {
  const context = useContext(TestStore3)
  console.log("---------- Dashboard -----------")
  console.log(context)

  return <div>
    Dashboard Screen
    <h1>{context.id}</h1>
    <h1>{context.password}</h1>
    <Link href="/"><a>Go back</a></Link>
  </div>
})

export default Dashboard
