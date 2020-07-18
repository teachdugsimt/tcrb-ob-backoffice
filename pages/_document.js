import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';
import { withTranslation } from '../i18n'
 class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags, namespacesRequired: [] };
  }

  render() {
    console.log("______________ Doccument Screen _______________")
    console.log(this.props)
    return (
      <html>
        <Head>
          {/* Step 5: Output the styles in the head  */}
          {/* <script
            id="session"
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(this.props.session, null, 2)
            }}
          /> */}
          {this.props.styleTags}
        </Head>
        <body style={{
          backgroundColor: 'lightgrey', width: "100%", height: "100%"
        }}>
          <Main style={{ width: "100%", height: "100%" }} />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default withTranslation('common')(MyDocument)

