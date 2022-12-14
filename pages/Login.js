import React,{ useState, useRef, useEffect } from 'react'
import Layout from '../src/components/Layout'
import { motion as m } from 'framer-motion'
import { useSelector } from 'react-redux'
// next
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
// assets
import { BiShow, BiHide } from 'react-icons/bi'
import loadingif from '../src/assets/loading.gif'
import loginPic from '../src/assets/login1.png'
// firebase
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth'
import { auth } from '../src/firebase-config'

const Login = () => {
  //const user = useSelector((state)=> state.user.value)
  const [loading, setloading] = useState(false)
  const router = useRouter()
  const email = useRef()
  const password = useRef()
  const submitButton = useRef()
  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [showPassword, setShowPassword] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setloading(true)
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) router.push('/')
      else setloading(false)
    })
  }, []);

  const login = async (email, password) => {
    let valid = true
    setloading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
        console.error(err.message);
        setValidEmail(false)
        setValidPassword(false)
        setError('email or password is invalid')
        valid = false
        setloading(false)
    } finally {
      setloading(false)
      if (valid) setTimeout(() => { router.push('/') }, 1000)
    }
  }

  const handleForm = (e) => {
    e.preventDefault()
    let emailValue = email.current.value.trim()
    let passValue = password.current.value.trim()
    login(emailValue,passValue)
  }

  const passwordShower = () => {
    setShowPassword(!showPassword)
    if (password.current.type === 'text') password.current.type = 'password'
    else  password.current.type = 'text'
  }

  const container1 = {
    hidden: { delay:1, x: -700, scale: .1 },
    show: {
      x: 0, scale: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.35,
        duration: .6,
        delay: 1.3,
        type: "tween"
      }
    }
  }

  const containerChild = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  const container2 = {
    hidden: { x: 700, scale: 0.1 },
    show: {
      x: 0, scale: 1,
      transition: {
        duration: .8,
        type: "spring",
        stiffness: 90,
        delay:.8
      }
    }
  }

  return (
    <Layout>
      <div className='flex mobile:flex-col-reverse mobile:gap-6 justify-around mt-16 mobile:mt-6'>
        <m.form
          onSubmit={handleForm}
          variants={container1}
          initial="hidden"
          animate="show"
          className={`${loading ? 'blur-[1px]' : ''} flex flex-col shadow-2xl gap-10 mobile:gap-8 border-2 rounded-md border-bhover dark:border-scolor p-3 mobile:pb-24 my-4 w-96 mobile:w-full relative`}
        >
          <m.div variants={containerChild} className="flex flex-col gap-2 relative">
            <label className={`font-bold ml-1`}>Email</label>
            <input autoComplete="email"  ref={email} className={`${validEmail ? '' : 'border-red-600'} p-2 rounded-md border text-black placeholder:text-gray-400`} type='text' placeholder='Enter your email' />
            {validEmail ? null : <div className="absolute text-red-600 -bottom-6 left-1">{error}</div>}
          </m.div>
          <m.div variants={containerChild} className="flex flex-col gap-2 relative">
            <label className={`font-bold ml-1`}>Password</label>
            <input ref={password} className={`${validPassword ? '' : 'border-red-600'} p-2 rounded-md border text-black placeholder:text-gray-400 `} type='password' placeholder='Enter your password' />
            {showPassword ? <BiShow onClick={passwordShower} className="showhide" /> : <BiHide onClick={passwordShower} className="showhide" /> }
            {validPassword ? null : <div className="absolute text-red-600 -bottom-6 left-1">{error}</div>}
          </m.div>
          <m.div variants={containerChild} className="w-full flex justify-center mt-4 relative">
            <button ref={submitButton} className="p-2 bg-buttonc font-inter active:scale-95 text-white rounded-lg text-bold text-lg w-72 transition-all hover:brightness-110" type='submit'>Login</button>
            <div className="absolute -bottom-12">Don't have an account? <Link href="/Signup"><span className="text-scolor cursor-pointer hover:underline">Signup.</span></Link></div>
          </m.div>
          {loading ?
            <div className="absolute top-0 right-0 w-full h-full bg-black/30">
              <div className="absolute blur-none bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
                <div className='loader' alt='loader' />
              </div>
            </div>
          : null}
        </m.form>
        <m.div
          variants={container2}
          initial="hidden"
          animate="show"
          drag
          dragConstraints={{ right:5,left:5,top:5,bottom:5}}
          className="flex flex-col gap-4 items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-6xl font-semibold">
              Login
            </h1>
            <p className="text-xl" >
              Get started by logging in!
            </p>
          </div>
          <div className="mobile:hidden pointer-events-none">
            <Image width={350} height={275} src={loginPic} alt='log-ill' priority />
          </div>
        </m.div>
      </div>
    </Layout>
  )
}

export default Login