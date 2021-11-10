import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout } from '@dj-components'
import { API_URL } from '@dj-config/index'
import styles from '@dj-styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import cookie from 'cookie'

export default function AddEventPage({ token }) {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  })
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()
    const hasEmptyField = Object.values(values).some(value => value === '')
    if (hasEmptyField) {
      toast.error('Fill all field!')
      return
    }

    const resp = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (!resp.ok) {
      if (resp.status === 403 || resp.status === 401) {
        return toast.error('No token included.')
      }
      toast.error('Something Went Wrong')
    } else {
      const evt = await resp.json()
      router.push(`/events/${evt.slug}`)
    }
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <Layout title='Add New Event'>
      <button onClick={() => router.back()}>{'<'} Go Back</button>

      <h1>Add Event Page</h1>
      <ToastContainer position='bottom-left' />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Event Name</label>
            <input type='text' id='name' name='name' value={values.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor='performers'>Performers</label>
            <input
              type='text'
              id='performers'
              name='performers'
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='venue'>Venue</label>
            <input type='text' id='venue' name='venue' value={values.venue} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor='address'>Address</label>
            <input type='text' id='address' name='address' value={values.address} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor='date'>Date</label>
            <input type='date' id='date' name='date' value={values.date} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor='time'>Time</label>
            <input type='text' id='time' name='time' value={values.time} onChange={handleInputChange} />
          </div>
        </div>
        {/* Text area is outside of grid */}
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            type='text'
            id='description'
            name='description'
            value={values.description}
            onChange={handleInputChange}
          />
        </div>

        <input type='submit' value='Add Event' className='btn' />
      </form>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = cookie.parse(req.headers.cookie)
  return {
    props: { token },
  }
}
