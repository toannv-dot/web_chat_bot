import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://gw.channel.io"/>
        <link rel="preconnect" href="https://api.channel.io"/>
        <link rel="preconnect" href="https://cdn.channel.io"/>
        <link rel="preconnect" href="https://cf.channel.io"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}