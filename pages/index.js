import Head from 'next/head'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import ThemeButton from '../src/utilities/themeButton';

export default function Home() {

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
        <meta name="blog" content="Blog created w/Redux and Firebase by emrealtunkaya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeButton />
    </motion.div>
  )
}
