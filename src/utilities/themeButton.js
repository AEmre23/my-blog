import React,{useEffect,useRef} from 'react'
import { MdOutlineDarkMode } from 'react-icons/md'
import { MdOutlineLightMode } from 'react-icons/md'

const ThemeButton = () => {
  const switchButton = useRef()

  useEffect(() => {
    let getTheme = localStorage.getItem('modeSelect')
    if(getTheme === 'dark') switchButton.current.checked=true
  }, []);

  const changeMode = (e) => {
    if (e.target.checked) {
      localStorage.setItem('modeSelect','dark')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('modeSelect','light')
    }
  }
  return (
    <label className="switch">
      <input ref={switchButton} onChange={changeMode} type="checkbox" />
      <span className="slider round before:z-20 ">
      </span>
      <MdOutlineLightMode className="cursor-pointer absolute top-1.5 z-10 text-black right-[5px]" />
      <MdOutlineDarkMode className="cursor-pointer absolute top-2 z-10 text-white left-[5px]" />
    </label>
  )
}

export default ThemeButton