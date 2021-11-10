import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Layout, Modal, ImageUpload } from '@dj-components'
import { API_URL } from '@dj-config/index'
import { FaImage } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '@dj-styles/Form.module.css'
import moment from 'moment'
import cookie from 'cookie'

export default function EditEventPage({ evt, token }) {
  const router = useRouter()
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  })
  const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)
  const [isModalShow, setIsModalShow] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const hasEmptyField = Object.values(values).some(value => value === '')
    if (hasEmptyField) {
      toast.error('Fill all field!')
      return
    }

    const resp = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
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

  const imageUploaded = async () => {
    const resp = await fetch(`${API_URL}/events/${router.query.id}`) // Why ${evt.id} doesn't work???
    const evt = await resp.json()
    setImagePreview(evt.image.formats.thumbnail.url)
    setIsModalShow(false)
  }

  return (
    <Layout title={`Edit ${evt.name} Event`}>
      <button onClick={() => router.back()}>{'<'} Go Back</button>
      <h1>Edit {evt.name} Event</h1>
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
            <input
              type='date'
              id='date'
              name='date'
              value={moment(values.date).format('yyyy-MM-DD')}
              onChange={handleInputChange}
            />
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

        <input type='submit' value='Update Event' className='btn' />

        <h2>Event Image</h2>
        {imagePreview ? (
          <Image src={imagePreview} width={170} height={100} alt={evt.name} />
        ) : (
          <div>
            <p>No image uploaded.</p>
          </div>
        )}
      </form>
      <div>
        <button className='btn-secondary btn-icon' onClick={() => setIsModalShow(true)}>
          <FaImage /> Set Image
        </button>
      </div>
      <Modal show={isModalShow} onClose={() => setIsModalShow(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} token={token} />
      </Modal>
    </Layout>
  )
}

export async function getServerSideProps({ req, query: { id } }) {
  if (!req.headers.cookie) {
    return {
      redirect: {
        destination: '/account/login',
        permanent: false,
      },
    }
  }

  const { token } = cookie.parse(req.headers.cookie)
  const resp = await fetch(`${API_URL}/events/${id}`)
  const evt = await resp.json()
  return {
    props: { evt, token },
  }
}
