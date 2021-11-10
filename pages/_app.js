import { AuthContextProvider } from '@dj-context/AuthContext'
import '../styles/globals.css'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let progressBarTimeout = null
const startProgressBar = () => {
  clearTimeout(progressBarTimeout)
  progressBarTimeout = setTimeout(NProgress.start, 200)
}
const stopProgressBar = () => {
  clearTimeout(progressBarTimeout)
  NProgress.done()
}
Router.events.on('routeChangeStart', () => startProgressBar())
Router.events.on('routeChangeComplete', () => stopProgressBar())
Router.events.on('routeChangeError', () => stopProgressBar())
NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
