import Link from 'next/link'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copy &copy; DJ Events 2021</p>
      <p>
        <Link href='/about'>
          <a>About This Peoject</a>
        </Link>
      </p>
    </footer>
  )
}
