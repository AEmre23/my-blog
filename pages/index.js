import Head from 'next/head'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../src/firebase-config'
import { useDispatch } from 'react-redux'
import ThemeButton from '../src/utilities/themeButton'
import { setLogin } from '../src/stores/user'
import Hero from '../src/components/Hero'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        dispatch(setLogin({
          name: currentUser.displayName,
          email: currentUser.email,
        }))
      }
    })
  }, []);

  useEffect(() => {
    let getMode = localStorage.getItem('modeSelect')
    if (getMode === 'dark') document.documentElement.classList.add('dark')
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Head>
        <title>emrealtunkaya | Blog </title>
        <meta name="Emre's blog" content="Blog created using Next.js and Firebase by Emre Altunkaya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <ThemeButton />
    </motion.div>
  )
}
