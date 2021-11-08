import { API_URL } from '@dj-config/index'
import cookie from 'cookie'

export default async (req, res) => {
  if (req.method === 'GET') {
    //if cookie is not there, just return
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized.' })
      return
    }
    //if cookie is there, use it to request to strapi and get the user back
    const { token } = cookie.parse(req.headers.cookie)
    const strapiResp = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const user = await strapiResp.json()

    if (strapiResp.ok) {
      res.status(200).json({ user })
    } else {
      res.status(403).json({ message: 'User forbidden.' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `${req.method} method is not allowed.` })
  }
}
