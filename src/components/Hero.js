import React from 'react'

const Hero = () => {
  return (
    <main>
      <div className="min-h-[calc(100vh_-_74px)] w-full bg-[url('/bg.png')] bg-[size:100%_100%] bg-newbg bg-no-repeat relative font-rubik">
        <div className="absolute left-[8%] top-[12%] mobile:top-[6%] mobile:left-[6%]">
          <h1 className="text-5xl font-bold">What's on your mind?</h1>
          <h2 className= "text-4xl font-medium ml-10 mt-3 mobile:ml-0">Share with everyone!</h2>
        </div>
        <div className="absolute right-[10%] bottom-[12%] mobile:right-[1%] mobile:bottom-[16%] max-w-lg mobile:max-w-[230px]">
          <h3 className="text-4xl mobile:text-xl font-normal dark:text-white tracking-wide [word-spacing:20px] mobile:[word-spacing:0]">Putting  your thoughts into writing is a great way to share them!</h3>
        </div>
      </div>
      <div className="relative h-screen w-full bg-[url('/bgr.png')] bg-[size:100%_100%] bg-no-repeat">

      </div>  
    </main>
  )
}

export default Hero