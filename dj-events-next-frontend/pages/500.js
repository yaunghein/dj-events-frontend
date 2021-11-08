import Link from 'next/link'
import { Layout } from '@dj-components'
import { FaExclamationTriangle } from 'react-icons/fa'
import styles from '@dj-styles/404.module.css'

export default function ServerErrorPage() {
  return (
    <Layout title='Server Error | DJ Events'>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          500
        </h1>
        <h4>Sorry, there is something wrong with server :(</h4>
        <Link href='/'>
          <a>Go Back Home</a>
        </Link>
      </div>
    </Layout>
  )
}
