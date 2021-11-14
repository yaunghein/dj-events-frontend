import { motion } from 'framer-motion'

export default function Mask({ delay = 0, children }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{
          y: '4em',
        }}
        animate={{
          y: 0,
          transition: {
            delay,
            duration: 0.6,
          },
        }}>
        {children}
      </motion.div>
    </div>
  )
}
