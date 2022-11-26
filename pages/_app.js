import '../src/styles/globals.css'
import { store } from '../src/app/store'
import { Provider, useSelector } from 'react-redux'
import NavBar from '../src/components/NavBar'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../src/firebase-config'
import { useDispatch } from 'react-redux'
import { setLogin } from '../src/stores/user'
import { setPosts } from '../src/stores/posts'
import { collection, getDocs } from 'firebase/firestore'

function AppComponent({ Component, pageProps }) {
  const posts = useSelector((state) => state.posts.value.sortedData)
  const dispatch = useDispatch()
  const postsCollectionRef = collection(db, "posts")

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef)
      const sortedData = data.docs.map((doc)=>({...doc.data(), id:doc.id}))
      dispatch(setPosts({ sortedData }))
    }
    getPosts()

  }, []);

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
    <div  className='font-nunito min-h-screen duration-700 text-newtext bg-newbg dark:bg-bg-dark dark:text-d-text overflow-hidden mobile:overflow-clip' >
      <NavBar />
      {posts?.length > 0 ? <Component {...pageProps} /> : null}
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppComponent Component={Component} pageProps={pageProps} />
    </Provider>
    )
}

export default MyApp
