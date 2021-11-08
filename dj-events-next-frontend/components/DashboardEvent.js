import Link from 'next/link'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import styles from '@dj-styles/DashboardEvent.module.css'

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${evt.slug}`}>{evt.name}</Link>
      </h4>
      <Link href={`/events/edit/${evt.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt /> <span>Edit</span>
        </a>
      </Link>
      <button className={styles.delete} onClick={() => handleDelete(evt)}>
        <FaTimes /> <span>Delete</span>
      </button>
    </div>
  )
}
