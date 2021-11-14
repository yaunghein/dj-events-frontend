import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { child } from '@dj-animation/stagger-slideIn'
import styles from '@dj-styles/EventItem.module.css'

export default function EventItem({ evt }) {
  return (
    <motion.div className={styles.event} variants={child}>
      <div className={styles.img}>
        <Image
          src={evt.image ? evt.image.formats.thumbnail.url : '/images/event-default.png'}
          width={170}
          height={100}
          alt={evt.name}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h3>{evt.name}</h3>
      </div>

      <Link href={`/events/${evt.slug}`}>
        <a className={`btn ${styles.detailBtn}`}>Details</a>
      </Link>
    </motion.div>
  )
}

// initial={{
//   opacity: 0,
//   y: 24,
// }}
// animate={{
//   opacity: 1,
//   y: 0,
//   transition: {
//     delay: index * 0.1,
//     type: 'spring',
//     stiffness: 200,
//   },
// }}
