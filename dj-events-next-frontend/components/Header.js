import Link from 'next/link'
import styles from '@dj-styles/Header.module.css'
import { Search } from '@dj-components'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href='/'>
            <a>DJ Events</a>
          </Link>
        </div>

        <Search />

        <nav>
          <ul>
            <li>
              <Link href='/events'>
                <a>Events</a>
              </Link>
            </li>
            <li>
              <Link href='/events/add'>
                <a>Add Event</a>
              </Link>
            </li>
            <li>
              <Link href='/about'>
                <a>About</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
