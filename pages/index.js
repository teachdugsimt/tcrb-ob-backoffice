import React, { useContext, useState } from 'react'
import TestStore3 from '../mobx-store/TestStore3'
import { observer } from 'mobx-react'
import Link from 'next/link'

const index = observer(() => {
  const [id, setId] = useState("")
  const [password, setPassword] = useState("")

  const context = useContext(TestStore3)

  console.log("--- index ---")
  console.log(context)

  const _setProfile = () => {
    if (id && password)
      context.setProfile(id, password)
    else alert("Invalid data")
  }

  return <div style={{ marginTop: 100 }}>
    Test Screen 1
    <h1>{context.id ? context.id : ""}</h1>
    <h1>{context.password ? context.password : ""}</h1>

    <input value={id} onChange={(e) => setId(e.target.value)} />
    <input value={password} onChange={(e) => setPassword(e.target.value)} />
    <button onClick={() => _setProfile()}>Set Profile</button>

    <Link href="/dashboard"><a><h1> Go To Dashboard</h1></a></Link>
  </div >
})

export default index
