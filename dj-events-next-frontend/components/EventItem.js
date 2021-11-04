import Link from 'next/link'
import Image from 'next/image'
import styles from '@dj-styles/EventItem.module.css'

export default function EventItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image src={evt.image} width={170} height={100} alt={evt.name} placeholder='blur' blurDataURL={evt.base64} />
      </div>

      <div className={styles.info}>
        <span>
          {evt.date} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <Link href={`/events/${evt.slug}`}>
        <a className={`btn ${styles.detailBtn}`}>Details</a>
      </Link>
    </div>
  )
}
