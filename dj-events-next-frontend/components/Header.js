import Link from 'next/link'
import { useContext } from 'react'
import { Search } from '@dj-components'
import { AuthContext } from '@dj-context/AuthContext'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import styles from '@dj-styles/Header.module.css'

export default function Header() {
  const { user, logout } = useContext(AuthContext)

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
              <Link href='/about'>
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link href='/events'>
                <a>Events</a>
              </Link>
            </li>
            {user ? (
              //if logged in
              <>
                <li>
                  <Link href='/events/add'>
                    <a>Add Event</a>
                  </Link>
                </li>
                <li>
                  <Link href='/account/dashboard'>
                    <a>Dashboard</a>
                  </Link>
                </li>
                <li>
                  <button className='btn-secondary btn-icon' onClick={logout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            ) : (
              //if logged out
              <li>
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt /> Login
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}
