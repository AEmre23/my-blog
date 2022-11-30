import '../src/styles/globals.css'
import { store } from '../src/app/store'
import { Provider, useSelector } from 'react-redux'
import NavBar from '../src/components/NavBar'
import Footer from '../src/components/Footer'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../src/firebase-config'
import { useDispatch } from 'react-redux'
import { setLogin } from '../src/stores/user'
import { setPosts } from '../src/stores/posts'
import { collection, getDocs } from 'firebase/firestore'
import { AnimatePresence } from 'framer-motion'
import logo from '../src/assets/elogo.png'
import Image from 'next/image'

function AppComponent({ Component, pageProps, router }) {
  const posts = useSelector((state) => state.posts.value)
  const dispatch = useDispatch()
  const postsCollectionRef = collection(db, "posts")

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef)
    const sortedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setTimeout(() => {
      dispatch(setPosts({
        data: sortedData,
        isLoading: false
      }))
    }, 2500)
  }

  useEffect(() => {
    getPosts()
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        dispatch(setLogin({
          name: currentUser.displayName,
          email: currentUser.email,
          id: currentUser.uid
        }))
      }
    })
  }, []);

  useEffect(() => {
    let getMode = localStorage.getItem('modeSelect')
    if (getMode === 'dark') document.documentElement.classList.add('dark')
  }, []);

  return (
  <>
      {posts.isLoading ?
        <div className="fixed h-screen w-full bg-newbg flex flex-col-reverse gap-3 items-center justify-center">
          <Image className="animate-pulse" src={logo} alt="site-logo" />
        </div>
      :
      <div className='font-nunito min-h-screen duration-700 text-newtext bg-newbg dark:bg-bg-dark dark:text-d-text overflow-clip' >
        <NavBar />
        <AnimatePresence>
          <Component key={router.pathname} {...pageProps} />
        </AnimatePresence>
        <Footer />
        </div>
      }
    </>
  )
}

function MyApp({ Component, pageProps,router }) {
  return (
    <Provider store={store}>
      <AppComponent Component={Component} pageProps={pageProps} router={router} />
    </Provider>
    )
}

export default MyApp
