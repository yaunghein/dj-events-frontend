import cookie from 'cookie'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    //destroy the cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0), //past date to destroy the cookie
        sameSite: 'strict',
        path: '/',
      })
    )
    res.status(200).json({ message: 'Successfully logged out.' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `${req.method} method is not allowed.` })
  }
}
