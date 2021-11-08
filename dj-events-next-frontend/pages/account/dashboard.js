import { useRouter } from 'next/router'
import { Layout, DashboardEvent } from '@dj-components'
import { API_URL } from '@dj-config/index'
import cookie from 'cookie'
import styles from '@dj-styles/Dashboard.module.css'
import { ToastContainer, toast } from 'react-toastify'

export default function Dashboard({ events, token }) {
  const router = useRouter()

  const deleteEvent = async evt => {
    if (confirm(`Are you sure to delete ${evt.name} event?`)) {
      const resp = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await resp.json()

      if (!resp.ok) {
        toast.error(data.message)
      } else {
        router.push('/account/dashboard')
      }
    }
  }

  return (
    <Layout title='User Dashboard'>
      <div className={styles.dash}>
        <ToastContainer position='bottom-left' />
        <h1>Dashboard Page</h1>
        <h3>My Events</h3>
        {events.map(evt => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = cookie.parse(req.headers.cookie)
  const resp = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
  const events = await resp.json()
  return {
    props: { events, token },
  }
}
