import { useState } from 'react'
import { API_URL } from '@dj-config/index'
import styles from '@dj-styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ImageUpload({ evtId, imageUploaded, token }) {
  const [image, setImage] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    setIsUploading(true)

    const formData = new FormData()
    formData.append('files', image)
    formData.append('ref', 'events')
    formData.append('refId', evtId)
    formData.append('field', 'image')

    const resp = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    const data = await resp.json()

    if (resp.ok) {
      setIsUploading(false)
      imageUploaded()
    } else {
      setIsUploading(false)
      toast.error(data.message)
    }
  }

  const handleFileChange = e => {
    setImage(e.target.files[0])
  }

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <ToastContainer position='bottom-left' />
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange} />
        </div>
        <input type='submit' value={isUploading ? 'Uploading...' : 'Upload'} className='btn' />
      </form>
    </div>
  )
}
