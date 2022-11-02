import Image from 'next/image'
import Link from 'next/link'
import React, { useState,useRef,useEffect } from 'react'
import logo from '../assets/logo1.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdClose } from 'react-icons/md'
import { onAuthStateChanged,signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import avatar from '../assets/avatar.jpg'
import { useRouter } from 'next/router'

const NavBar = () => {
  const router = useRouter()
  const [menuToggle, setMenuToggle] = useState(true)
  const [user,setUser] = useState({})
  const mobileMenu = useRef()

  const logout = async () => {
    await signOut(auth)
    setTimeout(()=> {router.push('/')},1000)
  }

useEffect(() => {
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })
}, []);
  
  return (
    <div className="sticky top-0 w-full z-30">
      <header className="w-full bg-scolor text-white border-b-2 p-4 flex justify-center items-center">
        <div className="w-9/12 mobile:w-11/12 flex justify-between items-center">
          <Link href='/'>
            <div onClick={()=>setMenuToggle(true)}  className="flex items-center gap-1 cursor-pointer transition-all hover:scale-105">
              <Image src={logo} width={40} height={40} alt='site-logo' />
              <h2 className="font-semibold">myBlog</h2>
            </div>
          </Link>
          <div className="flex gap-24 mt-2 mobile:hidden">
            <ul className="flex gap-4">
              <Link href="/About"><li className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-gray-300">About</li></Link>
              <Link href="/Contact"><li className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-gray-300">Contact</li></Link>
            </ul>
            <div className="">
              {user === null ?
                <ul className="flex gap-4">
                  <Link href="/Login"><li className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-gray-300">Login</li></Link>
                  <Link href="/Signup"><li className="cursor-pointer transition-all hover:-translate-y-0.5 hover:text-gray-300">Signup</li></Link>
                </ul>
                :
                <div onMouseOver={(e)=>e.currentTarget.lastElementChild.style.display='block'} onMouseLeave={(e)=>e.currentTarget.lastElementChild.style.display='none'} className="flex gap-4 relative cursor-pointer">
                  <div className="">{user.displayName}</div>
                  <div className=""><Image className="rounded-full" src={avatar} width={25} height={25} alt='avatar' /></div>
                  <button onClick={logout} className="absolute hidden -bottom-8 border-2 border-black bg-white text-black p-1 w-full">Logout</button>
                </div>
              }
            </div>
          </div>
          <div onClick={()=>setMenuToggle(!menuToggle)} className='text-white hidden mobile:block scale-125 z-50 relative'>
          {menuToggle ?
            <GiHamburgerMenu />
            :
            <MdClose className="scale-150" />
          }
          </div>
        </div>
      </header>
      <div ref={mobileMenu} className={`border-l-2 ${menuToggle ? 'translate-x-[225px]' : 'translate-x-0'} duration-500 fixed z-40 top-0 pt-24 right-0 w-[225px] h-screen bg-scolor text-white`}>
        <div className='px-6 text-right flex flex-col gap-3 text-2xl'>
          <Link href="/About"><div onClick={()=>setMenuToggle(true)}>About</div></Link>
          <Link href="/Contact"><div onClick={() => setMenuToggle(true)}>Contact</div></Link>
          {user === null ?
          <>
            <Link href="/Login"><div onClick={() => setMenuToggle(true)}>Login</div></Link>
            <Link href="/Signup"><div onClick={() => setMenuToggle(true)}>Signup</div></Link>
          </>
            :
            <div>
              <div className="flex justify-end gap-3 mt-6 text-right">
                <div className="">{user.displayName}</div>
                <div className="mt-1"><Image className="rounded-full" src={avatar} width={25} height={25} alt='avatar' /></div>
              </div>
              <button className="mt-2 text-sm p-2 bg-white text-scolor font-semibold rounded-md shadow-md" onClick={() => { logout(); router.push('/') }}>Logout</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default NavBar