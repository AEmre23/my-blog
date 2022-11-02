import '../src/styles/globals.css'
import { store } from '../src/app/store'
import { Provider } from 'react-redux'
import NavBar from '../src/components/NavBar'


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div  className='font-nunito min-h-screen duration-700 text-l-text bg-bg-light dark:bg-bg-dark dark:text-d-text' >
        <NavBar />
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}

export default MyApp
