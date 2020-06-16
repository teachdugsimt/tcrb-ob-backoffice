// import { useState } from 'react'
import Header from '../components/test-dynamic/Header'
import dynamic from 'next/dynamic'

const DynamicComponent1 = dynamic(() => import('../components/test-dynamic/hello1'))

const DynamicComponent2WithCustomLoading = dynamic(
  () => import('../components/test-dynamic/hello2'),
  { loading: () => <p>Loading caused by client page transition ...</p> }
)

const DynamicComponent3WithNoSSR = dynamic(
  () => import('../components/test-dynamic/hello3'),
  { loading: () => <p>Loading ...</p>, ssr: false }
)

const DynamicComponent4 = dynamic(
  () => {
    setTimeout(() => {
      import('../components/test-dynamic/hello4')
    }, 5000);
  }
  ,
  { loading: () => <p>Loading ...</p>, ssr: false }
)

const DynamicComponent5 = dynamic(
   () =>
     import('../components/test-dynamic/hello5')

      // await sleep(3000)
  ,
    // setTimeout(() => {
      // await sleep(3000),
      // import('../components/test-dynamic/hello5'),
    // }, 5000);


  { loading: () => <p>Loading ...</p>, ssr: false }
)

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const IndexPage = () => {
    const [showMore, setShowMore] = useState(false)
    const [falsyField] = useState(false)

    return (
      <div>
        <Header />

        {/* Load immediately, but in a separate bundle */}
        <DynamicComponent1 />

        {/* Show a progress indicator while loading */}
        <DynamicComponent2WithCustomLoading />

        {/* Load only on the client side */}
        <DynamicComponent3WithNoSSR />

        {/* This component will never be loaded */}
        {falsyField && <DynamicComponent4 />}

        {/* Load on demand */}
        {showMore && <DynamicComponent5 />}
        <button onClick={async() => {

          setShowMore(!showMore)
          }}>Toggle Show More</button>
      </div>
    )
  }

  export default IndexPage
