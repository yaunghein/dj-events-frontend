import { useRouter } from 'next/router'
import Image from 'next/image'
import { Layout } from '@dj-components'
import { API_URL } from '@dj-config/index'
import styles from '@dj-styles/Event.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function EventPage({ evt, href }) {
  const router = useRouter()
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        <ToastContainer position='bottom-left' />
        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.large.url} width={1100} height={600} alt={evt.name} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <button onClick={() => router.back()}>{'<'} Go Back</button>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query: { slug } }) {
  const resp = await fetch(`${API_URL}/events?slug=${slug}`)
  const events = await resp.json()

  return {
    props: { evt: events[0] },
  }
}

// export async function getStaticPaths() {
//   const resp = await fetch(`${API_URL}/events`)
//   const events = await resp.json()
//   const paths = events.map(evt => ({
//     params: { slug: evt.slug },
//   }))

//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }

// export async function getStaticProps(context) {
//   const resp = await fetch(`${API_URL}/events?slug=${context.params.slug}`)
//   const events = await resp.json()

//   return {
//     props: { evt: events[0] },
//     revalidate: 1,
//   }
// }
