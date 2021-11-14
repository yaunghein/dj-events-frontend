export const parent = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.0001,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

export const child = {
  hidden: {
    x: -24,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
}
