import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout, EventItem } from '@dj-components'
import { API_URL } from '@dj-config/index'
import qs from 'qs'

export default function SearchPage({ events }) {
  const router = useRouter()
  return (
    <Layout title='Search Result'>
      <Link href='/events'>
        <a>{'<'} Go Back</a>
      </Link>
      {events.length === 0 && <h3>No events to show.</h3>}
      <h1>
        Found {events.length} {events.length > 1 ? 'Results' : 'Result'} for {router.query.term}.
      </h1>
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { term } = context.query
  const queryString = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  })
  const resp = await fetch(`${API_URL}/events?${queryString}`)
  const searchResultEvents = await resp.json()

  return {
    props: { events: searchResultEvents },
  }
}
