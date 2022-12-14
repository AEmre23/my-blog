import Head from "next/head"
import { useRouter } from "next/router"


const Layout = ({ children }) => {
  const router = useRouter()
  const pathname = router.pathname
  const name = pathname.replace(/[^a-zA-Z ]/g, "");

  return (
    <div className="w-full min-h-screen flex justify-center pt-28 bigscreen:pt-36">
      <Head>
        <title>e-Blog | {name} </title>
      </Head>
      <div className="w-9/12 mobile:w-11/12">
        {children}
      </div>
    </div>
  )
}

export default Layout