import React, { useState,useRef,useEffect } from 'react'
// next
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
// assets
import logo from '../assets/elogofull.png'
import avatar from '../assets/avatar.jpg'
// react icon
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdClose } from 'react-icons/md'
// firebase
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import { useSelector } from 'react-redux'

const NavBar = () => {
  const router = useRouter()
  const user = useSelector((state) => state.user.value)

  const [menuToggle, setMenuToggle] = useState(true)
  const mobileMenu = useRef()

  const logout = async () => {
    await signOut(auth)
    setTimeout(()=> {window.location.reload()},1000)
  }

  useEffect(() => {
    // If menu is opened in mobile, scrolling gonna be blocked
    if (menuToggle) document.documentElement.classList.remove('stopscroll')
    else document.documentElement.classList.add('stopscroll')
  }, [menuToggle]);

  return (
    <div className="absolute mobile:fixed top-0 right-0 w-full z-30">
      <header className="w-full bg-newbg/75 text-newtext text-lg font-bold border-b-2 border-newtext/75 p-4 flex justify-center items-center">
        <div className="w-9/12 mobile:w-11/12 flex justify-between items-center">
          <Link href='/'>
            <div onClick={()=>setMenuToggle(true)}  className="flex items-center gap-3 cursor-pointer transition-all scale-125 hover:scale-[1.27]">
              <Image src={logo} width={115} height={45} alt='site-logo' />
            </div>
          </Link>
          <div className="flex items-center gap-24 mt-2 mobile:hidden">
            <ul className="flex gap-4">
              <Link href="/Posts"><li className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-black">Posts</li></Link>
              <Link href="/About"><li className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-black">About</li></Link>
            </ul>
            <div className="">
              {user.email.length === 0 ?
                <ul className="flex gap-4">
                  <Link href="/Login"><li className="cursor-pointer font-semibold text-gray-300 bg-newtext hover:bg-bhover p-1 px-4 rounded-lg transition-all hover:text-white">Login</li></Link>
                  <Link href="/Signup"><li className="cursor-pointer font-semibold text-gray-300 bg-newtext hover:bg-bhover p-1 px-4 rounded-lg transition-all hover:text-white">Signup</li></Link>
                </ul>
                :
                <div className="flex gap-3">
                  <Link href="/CreatePost"><span className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-black">Create Post</span></Link>
                  <div onMouseOver={(e)=>e.currentTarget.lastElementChild.style.display='block'} onMouseLeave={(e)=>e.currentTarget.lastElementChild.style.display='none'} className="flex flex-row-reverse gap-2 pl-4 relative cursor-pointer">
                    <div className="">{user.name}</div>
                    <div className=""><Image className="rounded-full" src={avatar} width={25} height={25} alt='avatar' /></div>
                    <button onClick={logout} className="absolute hidden -bottom-8 left-3 shadow-md border-2  border-white bg-scolor text-white p-1 w-full">Logout</button>
                  </div>
                </div>
              }
            </div>
          </div>
          <div onClick={()=>setMenuToggle(!menuToggle)} className='text-white hidden mobile:block scale-125 z-50 relative'>
          {menuToggle ?
            <GiHamburgerMenu className="text-newtext" />
            :
            <MdClose className="scale-150 text-newtext" />
          }
          </div>
        </div>
      </header>
      <div ref={mobileMenu} className={`border-l-2 ${menuToggle ? 'translate-x-[225px]' : 'translate-x-0 '} duration-500 fixed z-40 top-0 pt-24 right-0 w-[225px] h-screen bg-white/90 text-newtext`}>
        <div className='px-6 text-right flex flex-col gap-3 text-2xl font-bold'>
          <Link href="/Posts"><div onClick={() => setMenuToggle(true)}>Posts</div></Link>
          <Link href="/About"><div onClick={()=>setMenuToggle(true)}>About</div></Link>
          {user.email.length === 0 ?
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/Login"><div onClick={() => setMenuToggle(true)}>Login</div></Link>
              <Link href="/Signup"><div onClick={() => setMenuToggle(true)}>Signup</div></Link>
            </div>
            :
            <div>
              <Link href="/CreatePost"><div onClick={() => setMenuToggle(true)}>Create Post</div></Link>
              <div>
                <div className="flex justify-end items-center gap-3 mt-12 text-right">
                  <div className="">{user.name}</div>
                  <div className="mt-1"><Image className="rounded-full" src={avatar} width={40} height={40} alt='avatar' /></div>
                </div>
                <button className="mt-2 text-sm p-2 bg-newtext text-white font-semibold rounded-md shadow-md" onClick={() => { logout(); router.push('/') }}>Logout</button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar