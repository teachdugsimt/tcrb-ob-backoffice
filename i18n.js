// const NextI18Next = require('next-i18next').default

// module.exports = new NextI18Next({
//   defaultLanguage: 'th',
//   otherLanguages: ['en'],
//   shallowRender: true
// })


const NextI18Next = require('next-i18next').default

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'th',
  otherLanguages: ['en', 'th'],
  shallowRender: true
})

module.exports = NextI18NextInstance

module.exports =  {
  appWithTranslation,
  withTranslation,
} = NextI18NextInstance
