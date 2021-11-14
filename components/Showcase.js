import styles from '@dj-styles/Showcase.module.css'
import Mask from '@dj-animation/Mask'

export default function Showcase() {
  return (
    <div className={styles.showcase}>
      <Mask>
        <h1>Welcome To The Party!</h1>
      </Mask>
      <Mask delay={0.2}>
        <p>Find the hottest DJ events</p>
      </Mask>
    </div>
  )
}
