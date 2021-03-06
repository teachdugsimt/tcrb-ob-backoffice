/* eslint-disable */
const withLess = require('@zeit/next-less')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const withImage = require('next-images')
const withFonts = require('next-fonts')
const withPlugins = require('next-compose-plugins')

const withSass = require('@zeit/next-sass')

// module.exports = withImage({})
module.exports = withImage({
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    PORT: process.env.PORT || 3000,
    APIGW_ID_UAM: process.env.APIGW_ID_UAM,
    APIGW_ID_CUSTSER: process.env.APIGW_ID_CUSTSER,
    APIGW_ID_LIGIABLE: process.env.APIGW_ID_LIGIABLE,
    VPC: process.env.VPC
  },
})
// const withLess = require('@zeit/next-less')

// const isProd = process.env.NODE_ENV === 'production'

// // fix: prevents error when .less files are required by node
// if (typeof require !== 'undefined') {
//   require.extensions['.less'] = file => { }
// }

// module.exports = withLess(
//   withSass(
//     withImage({
//       lessLoaderOptions: {
//         javascriptEnabled: true
//       }
//     })
//   )
// )


// Where your antd-custom.less file lives
// const themeVariables = lessToJS(
//   fs.readFileSync(path.resolve(__dirname, './antd-custom.less'), 'utf8')
// )

// module.exports = withFonts(withLess(
//   withImage({
//     lessLoaderOptions: {
//       javascriptEnabled: true,
//       modifyVars: themeVariables, // make your antd custom effective
//     },
//     webpack: (config, { isServer }) => {
//       if (isServer) {
//         const antStyles = /antd\/.*?\/style.*?/
//         const origExternals = [...config.externals]
//         config.externals = [
//           (context, request, callback) => {
//             if (request.match(antStyles)) return callback()
//             if (typeof origExternals[0] === 'function') {
//               origExternals[0](context, request, callback)
//             } else {
//               callback()
//             }
//           },
//           ...(typeof origExternals[0] === 'function' ? [] : origExternals),
//         ]

//         config.module.rules.unshift({
//           test: antStyles,
//           use: 'null-loader',
//         })
//       }
//       return config
//     },
//   })
// ))

// const nextConfig = {}
// // plugins ????????????????????????????????????????????????????????????
// const plugins = [
//   withLess({
//     lessLoaderOptions: {
//       javascriptEnabled: true,
//       modifyVars: themeVariables, // make your antd custom effective
//     },
//     webpack: (config, { isServer }) => {
//       if (isServer) {
//         const antStyles = /antd\/.*?\/style.*?/
//         const origExternals = [...config.externals]
//         config.externals = [
//           (context, request, callback) => {
//             if (request.match(antStyles)) return callback()
//             if (typeof origExternals[0] === 'function') {
//               origExternals[0](context, request, callback)
//             } else {
//               callback()
//             }
//           },
//           ...(typeof origExternals[0] === 'function' ? [] : origExternals),
//         ]

//         config.module.rules.unshift({
//           test: antStyles,
//           use: 'null-loader',
//         })
//       }
//       return config
//     }
//   }),
//   withImage,
//   withFonts
// ]
// module.exports = withPlugins(plugins, nextConfig)
