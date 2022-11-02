import React,{ useState,useRef,useEffect } from 'react'
import Layout from '../src/components/Layout'
import signupPic from '../src/assets/Mobile-login.png'
import { motion as m } from 'framer-motion'
import Image from 'next/image'
import loadingif from '../src/assets/loading.gif'
import { useRouter } from 'next/router'
import { BiShow, BiHide } from 'react-icons/bi'
import { validateEmail } from '../src/functions/emailValidation'
import { updateProfile,createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../src/firebase-config'
import Link from 'next/link'

const Signup = () => {
  const router = useRouter()
  const [loading, setloading] = useState(false)
  const [showPassword, setShowPassword] = useState(true)
  const [passwordError, setPasswordError] = useState('')
  const [mailError, setMailError] = useState('')
  const username = useRef()
  const email = useRef()
  const password1 = useRef()
  const password2 = useRef()
  const submitButton = useRef()
  const [validUsername, setValidUsername] = useState(true)
  const [validEmail, setValidEmail] = useState(true)
  const [validPassword, setValidPassword] = useState(true)
  const [validPasswordCheck, setValidPasswordCheck] = useState(true)

  const register = async (email, password, username) => {
  let valid=true
  try {
      setloading(true)
      await createUserWithEmailAndPassword(auth, email, password).catch((err) => {
        console.log(err)
        setValidEmail(false)
        setMailError("this email is already in use")
        setloading(false)
        valid=false
      });
      await updateProfile(auth.currentUser, { displayName: username }).catch(
        (err) => console.log(err)
      );
    } catch (err) {
      console.log(err);
  }
    setloading(false)
    if(valid){
      submitButton.current.innerText = 'Done'
      submitButton.current.style.backgroundColor = 'lightgreen'
      setTimeout(() => { router.push('/') },2000)
    }
  };
  
  const handleForm = (e) => {
    let valid = [0,0,0]
    e.preventDefault()
    if (username.current.value.trim().length < 2 | username.current.value.trim().length > 20) {
      setValidUsername(false)
      valid[0]=0
    }
    else {
      setValidUsername(true)
      valid[0]=1
    }
    if (!validateEmail(email.current.value.trim())) {
      setValidEmail(false)
      setMailError('invalid email')
      valid[1]=0
    }
    else {
      setValidEmail(true)
      valid[1]=1
    }
    if (password1.current.value.trim() !== password2.current.value.trim()) {
      setValidPassword(false)
      setValidPasswordCheck(false)
      setPasswordError("passwords doesn't match")
      valid[2]=0
    }
    else if (password1.current.value.trim().length < 6) {
      setValidPassword(false)
      setValidPasswordCheck(false)
      setPasswordError("password must be longer than 5 letters")
      valid[2]=0
    }
    else {
      setValidPassword(true)
      setValidPasswordCheck(true)
      valid[2]=1
    }
    if (valid.every((x) => x === 1)) {
      register(email.current.value.trim(), password1.current.value.trim(),username.current.value.trim())
    }
  }

  const passwordShower = () => {
    setShowPassword(!showPassword)
    if (password1.current.type === 'text') {
      password1.current.type = 'password'
      password2.current.type = 'password'
    }else {
      password1.current.type = 'text'
      password2.current.type = 'text'
    }
  }

  return (
    <Layout>
      <div className='flex mobile:flex-col-reverse mobile:pb-12 mobile:gap-6 justify-around overflow-hidden'>
        <m.form
          onSubmit={handleForm}
          transition={{ ease:'easeOut', duration:.75, delay:1 }}
          initial={{ x:-700 }}
          animate={{ x:0 }}
          className={`${loading ? 'blur-[2px]' : ''} flex flex-col gap-8 border-2 rounded-md border-l-text pb-8 dark:border-scolor p-3 my-4 w-96 mobile:w-full relative`}
        >
          <div className="flex flex-col gap-2 relative">
            <label className={`font-semibold ml-1`}>Username*</label>
            <input ref={username} className={`${validUsername ? 'border-current' : 'border-red-600'} p-2 focus:outline-green-400 rounded-md border  bg-sdarkc text-white placeholder:text-gray-400`} type='text' placeholder='Pick an username' />
          {validUsername ? null : <div className="absolute text-red-600 -bottom-6 left-1">enter at least 2 letters</div>}
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className={`font-semibold ml-1`}>Email*</label>
            <input ref={email} className={`${validEmail ? 'border-current' : 'border-red-600'} p-2 focus:outline-green-400 rounded-md border bg-sdarkc text-white placeholder:text-gray-400`} type='text' placeholder='Enter your email' />
            {validEmail ? null : <div className="absolute text-red-600 -bottom-6 left-1">{mailError}</div>}
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className={`font-semibold ml-1`}>Password*</label>
            <input ref={password1} className={`${validPassword ? 'border-current' : 'border-red-600'} p-2 focus:outline-green-400 rounded-md border bg-sdarkc text-white placeholder:text-gray-400 `} type='password' placeholder='Enter a password' />
            {showPassword ?
            <BiShow onClick={passwordShower} className="absolute bottom-3 text-white right-3 cursor-pointer scale-125 hover:text-gray-400" />
            : <BiHide onClick={passwordShower} className="absolute bottom-3 text-white right-3 cursor-pointer scale-125 hover:text-gray-400" />
            }
          {validPassword ? null : <div className="absolute text-red-600 -bottom-6 left-1">{passwordError}</div>}
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className={`font-semibold ml-1`}>Enter password again*</label>
            <input ref={password2} className={`${validPasswordCheck ? 'border-current' : 'border-red-600'} p-2 focus:outline-green-400 rounded-md border bg-sdarkc text-white placeholder:text-gray-400`} type='password' placeholder='Enter password again' />
            {showPassword ?
            <BiShow onClick={passwordShower} className="absolute bottom-3 scale-125 text-white right-3 cursor-pointer hover:text-gray-400" />            
            : <BiHide onClick={passwordShower} className="absolute bottom-3 scale-125 text-white right-3 cursor-pointer hover:text-gray-400" />
            }
          {validPasswordCheck ? null : <div className="absolute text-red-600 -bottom-6 left-1">{passwordError}</div>}
          </div>
          <div className="w-full flex justify-center mt-4 relative">
            <button ref={submitButton} className="p-2 bg-buttonc font-inter active:scale-95 text-white rounded-lg text-bold text-lg w-72 transition-all hover:brightness-110" type='submit'>Sign up</button>
            <div className="absolute -bottom-8">Already an user? <Link href="/Login"><span className="text-scolor cursor-pointer hover:underline">Login.</span></Link></div>
          </div>
          {loading ? <div className="absolute top-0 right-0 w-full h-full bg-black/30"><div className="absolute blur-none bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"><Image src={loadingif} alt='loader'/></div></div> : null}
        </m.form>
        <m.div
          transition={{ duration: 1 }}
          initial={{ x:700 }}
          animate={{ x: 0 }}
          className="flex flex-col gap-4 items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-6xl font-semibold">
              Sign Up
            </h1>
            <p className="text-xl" >
              Sign up to create blogs and join our community!
            </p>
          </div>
          <div className="mobile:hidden">
            <Image width={350} height={275} src={signupPic} alt='sign-ill' />
          </div>
        </m.div>
      </div>
    </Layout>
  )
}

export default Signup