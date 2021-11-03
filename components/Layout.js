import Head from 'next/head'
import { Header, Footer } from '@dj-components'
import styles from '../styles/Layout.module.css'

export default function Layout({ title, keywords, description, children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  )
}

Layout.defaultProps = {
  title: 'DJ events | Find the hottest parties',
  desctiption: 'You can find all the latest and other musical events.',
  keywords: 'music, dj, edm, events',
}
