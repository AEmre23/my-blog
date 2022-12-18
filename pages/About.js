import Image from 'next/image'
import emrepic from '../src/assets/emre-pp.png'
import zeynepic from '../src/assets/zeynep-pp.jpg'
import { HiOutlineMail } from 'react-icons/hi'
import { BsLinkedin } from 'react-icons/bs'

const About = () => {
  return (
    <div className="mobile:h-auto mobile:pt-[80px] pt-8">
      <div className="flex mobile:flex-col mobile:gap-12 min-h-screen mobile:pb-12 justify-evenly items-center text-xl">
        
        <div className="py-12 h-[600px] rounded-[120px] shadow-xl w-[25vw] mobile:w-[90vw] mobile:mx-2 px-6 mobile:py-3 mobile:px-2 overflow-hidden relative flex justify-center items-center bg-newtext text-white ">
          <div className="flex flex-col items-center py-4 gap-7 text-center ">
            <div className="bg-white flex items-center justify-center rounded-full p-1">
              <Image src={emrepic} width={150} height={150} alt="emre-profile-pic" />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3  font-rubik">
                <h2 className=" font-rubik text-4xl">Emre Altunkaya</h2>
                <h3 className=" font-rubik text-2xl italic">Frontend Developer</h3>
              </div>
              <article className="text-lg">
                I love creating websites and apps that are user-friendly and aesthetically pleasing.
                 I complete my projects by designing and customizing according to customer needs, using the language and technologies I have learned. 
              </article>
            </div>
            <div className="flex gap-4 items-center">
              <a target="blank" href='mailto:aemrea23@gmail.com'><HiOutlineMail className="cursor-pointer h-12 w-12 hover:scale-105 duration-300 hover:rotate-12" /></a>
              <a target="blank" href='https://www.linkedin.com/in/ahmet-emre-altunkaya/'><BsLinkedin className="cursor-pointer h-8 w-8 hover:scale-105 duration-300 hover:-rotate-12" /></a>
            </div>
          </div>
        </div>

        <div className="py-12 h-[600px] rounded-[120px] shadow-xl w-[25vw] mobile:w-[90vw] mobile:mx-2 px-6 mobile:py-3 mobile:px-2 overflow-hidden relative flex justify-center items-center bg-newtext text-white ">
          <div className="flex flex-col items-center py-4 gap-7 text-center ">
            <div className="bg-white flex items-center justify-center rounded-full p-1">
              <Image className="rounded-full overflow-hidden" src={zeynepic} width={150} height={150} alt="emre-profile-pic" />
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3  font-rubik">
                <h2 className="font-rubik text-4xl">Zeynep Altunkaya</h2>
                <h3 className="font-rubik text-2xl italic">UI / UX Designer</h3>
              </div>
              <article className="text-lg">
                I love making designs that aim to improve the user experience and enjoy the users while interacting with the products.
                I aim to create useful and user-friendly designs by conducting research to understand user needs.
              </article>
            </div>
            <div className="flex gap-4 items-center">
              <a target="blank" href='mailto:zeynepmerveceker@gmail.com'><HiOutlineMail className="cursor-pointer h-12 w-12 hover:scale-105 duration-300 hover:rotate-12" /></a>
              <a target="blank" href='https://www.linkedin.com/in/zeynep-merve-altunkaya-53902082/'><BsLinkedin className="cursor-pointer h-8 w-8 hover:scale-105 duration-300 hover:-rotate-12" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About