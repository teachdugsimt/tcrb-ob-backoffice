import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/hello'))

function Test() {
  return (
    <div>
      <Header />
      <DynamicComponent />
      <p>Test PAGE is here!</p>
    </div>
  )
}

export default Test
