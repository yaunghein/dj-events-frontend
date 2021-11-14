import Link from 'next/link'
import { Layout, EventItem } from '@dj-components'
import { API_URL } from '@dj-config/index'
import { motion } from 'framer-motion'
import { parent } from '@dj-animation/stagger-slideIn'

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show.</h3>}

      <motion.div variants={parent} initial='hidden' animate='visible'>
        {events.map((evt, index) => (
          <EventItem key={evt.id} evt={evt} index={index} />
        ))}
      </motion.div>

      <Link href='/events'>
        <a className='btn-secondary'>See All Events</a>
      </Link>
    </Layout>
  )
}

export async function getStaticProps() {
  const resp = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const events = await resp.json()

  return {
    props: { events },
    revalidate: 1,
  }
}
