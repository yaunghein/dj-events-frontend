import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header, Footer, Showcase } from '@dj-components'
import styles from '@dj-styles/Layout.module.css'

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>
      <Header />
      {router.pathname === '/' && <Showcase />}
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
