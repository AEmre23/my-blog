import Head from 'next/head'
import { motion } from 'framer-motion'

import Hero from '../src/components/Hero'

export default function Home() {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>e-Blog | Home</title>
        <meta name="Emre's blog" content="Blog created using Next.js and Firebase by Emre Altunkaya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </motion.div>
  )
}
