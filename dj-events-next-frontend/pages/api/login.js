import { API_URL } from '@dj-config/index'
import cookie from 'cookie'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { identifier, password } = req.body

    const strapiResp = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    })
    const data = await strapiResp.json()

    if (strapiResp.ok) {
      // set cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      )

      res.status(200).json({ user: data.user })
    } else {
      res.status(data.statusCode).json({ message: data.message[0].messages[0].message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `${req.method} method is not allowed.` })
  }
}
