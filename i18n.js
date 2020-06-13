const NextI18Next = require('next-i18next').default

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['en', 'th'],
  shallowRender: true
})

module.exports = NextI18NextInstance

// module.exports = {
//   appWithTranslation,
//   withTranslation,
// } = NextI18NextInstance
