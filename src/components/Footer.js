import Link from 'next/link'
import { useSelector } from 'react-redux'
import { BiUpArrowCircle } from "react-icons/bi"

const Footer = () => {
  const user = useSelector((state) => state.user.value)
  const pages = ["Home","Posts","About"]
  
  return (
    <div className="w-full min-h-24 flex items-center p-4 px-24 mobile:px-8 gap-2 text-gray-200  justify-between bg-bhover">
      <div className="flex mobile:flex-col font-bold gap-12 mobile:gap-4 text-lg ">
        <div className="flex font-bold gap-8">
        {pages.map((each, i) => (
          <Link key={i} href={`${i == 0 ? "/" : each}`}>
            <div className="cursor-pointer duration-200 hover:scale-105">{each}</div>
          </Link>
        ))
        }
        </div>
        <div className="flex gap-8">
        {user.email ?
          <Link href={"CreatePost"}>
            <div className="cursor-pointer duration-200 pl-8 mobile:pl-0 hover:scale-105">Create Post</div>
          </Link>
          :
          <>
            <Link href={"Login"}>
              <div className="cursor-pointer duration-200 hover:scale-105">Login</div>
            </Link>
            <Link href={"Signup"}>
              <div className="cursor-pointer duration-200 hover:scale-105">Signup</div>
            </Link>
          </>
          }
        </div>
      </div>
      <div className="">
        <BiUpArrowCircle onClick={()=>document.documentElement.scrollTop = 0} className="w-12 cursor-pointer duration-200 hover:-translate-y-1 h-12" />
      </div>
    </div>
  )
}

export default Footer
