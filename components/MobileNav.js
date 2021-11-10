import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '@dj-context/AuthContext'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import styles from '@dj-styles/MobileNav.module.css'

export default function MobileNav({ setIsMobileNavOpen }) {
  const router = useRouter()
  const { user, logout } = useContext(AuthContext)
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DJ Events</a>
        </Link>
      </div>
      <nav className={styles.mobileNav}>
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
      <button onClick={() => setIsMobileNavOpen(false)} className={styles.close}>
        <span>CLOSE</span>
      </button>
    </div>
  )
}
