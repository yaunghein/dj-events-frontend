import { Layout, EventItem } from '@dj-components'
import { API_URL } from '@dj-config/index'
// import { getPlaiceholder } from 'plaiceholder'

export default function EventPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 && <h3>No events to show.</h3>}

      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const resp = await fetch(`${API_URL}/events?_sort=date:ASC`)
  const events = await resp.json()
  // const eventsWithBlurPlaceholder = await Promise.all(
  //   events.map(async evt => {
  //     const { base64 } = await getPlaiceholder(evt.image.formats.thumbnail.url)
  //     return { ...evt, base64 }
  //   })
  // ).then(events => events)

  return {
    props: { events },
    revalidate: 1,
  }
}
