import React from 'react'
import { withTranslation } from '../i18n'
import ProductOnboard from '../components/product-onboard';
const ProductOnboarding = () => {
  return (
    <div>
      <ProductOnboard />
    </div>
  )
}

ProductOnboarding.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation('common')(ProductOnboarding)
