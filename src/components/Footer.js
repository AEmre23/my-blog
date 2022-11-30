import Link from 'next/link'
import { useSelector } from 'react-redux'
import { BiUpArrowCircle } from "react-icons/bi"

const Footer = () => {
  const user = useSelector((state) => state.user.value)
  const pages = ["Home","Posts","About"]
  
  return (
    <footer className="w-full flex justify-center items-center bg-bhover">
      <div className="w-9/12 mobile:w-11/12 min-h-24 flex items-center p-4 mobile:px-2 gap-2 text-gray-200  justify-between ">
        <div className="flex mobile:flex-col font-bold gap-20 mobile:gap-2 text-lg ">
          <div className="flex font-bold gap-8 border-r-2 pr-20 mobile:border-r-0 mobile:pr-0 mobile:border-b-2 mobile:pb-2">
          {pages.map((each, i) => (
            <Link key={i} href={`${i == 0 ? "/" : "/" + each}`}>
              <div className="cursor-pointer duration-200 hover:text-white">{each}</div>
            </Link>
          ))
          }
          </div>
          <div className="flex gap-8">
          {user.email ?
            <Link href="/CreatePost">
              <div className="cursor-pointer duration-200 hover:text-white">Create Post</div>
            </Link>
            :
            <>
              <Link href="/Login">
                <div className="cursor-pointer duration-200 hover:text-white">Login</div>
              </Link>
              <Link href="/Signup">
                <div className="cursor-pointer duration-200 hover:text-white">Signup</div>
              </Link>
            </>
            }
          </div>
        </div>
        <div className="flex">
          <BiUpArrowCircle onClick={()=>document.documentElement.scrollTop = 0} className="w-12 cursor-pointer duration-200 hover:-translate-y-1 h-12" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
