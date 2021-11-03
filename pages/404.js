import Link from 'next/link'
import { Layout } from '@dj-components'
import { FaExclamationTriangle } from 'react-icons/fa'
import styles from '@dj-styles/404.module.css'

export default function NotFoundPage() {
  return (
    <Layout title='Page Not Found | DJ Events'>
      <div className={styles.error}>
        <h1>
          <FaExclamationTriangle />
          404
        </h1>
        <h4>Sorry, there is nothing here :(</h4>
        <Link href='/'>
          <a>Go Back Home</a>
        </Link>
      </div>
    </Layout>
  )
}
