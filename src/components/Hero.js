import BlogCard from './BlogCard'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import illu from '../assets/illu.png'
import Link from 'next/link'


const Hero = () => {
  const posts = useSelector((state) => state.posts.value.sortedData)

  return (
    <main>
      <div className="min-h-screen w-full bg-[url('/bg.png')] bg-[size:100%_100%] mobile:bg-[size:160%_110%] bg-no-repeat relative font-rubik cursor-default">
        <div className="absolute right-[8%] bottom-[23%] bigscreen:right-[10%] mobile:bottom-0 mobile:top-28 mobile:right-0 mobile:left-4">
          <h1 className="text-5xl bigscreen:text-6xl font-bold mobile:max-w-[300px]">What's on your mind?</h1>
          <h2 className= "text-4xl bigscreen:text-5xl font-medium mt-3 mb-16 mobile:mb-8 mobile:max-w-[300px] mobile:ml-0">Share with everyone!</h2>
          <h3 className="text-3xl bigscreen:text-4xl mobile:text-xl font-normal mb-4 max-w-md dark:text-white tracking-wide mobile:max-w-[200px] [word-spacing:10px] mobile:[word-spacing:0]">Putting  your thoughts into writing is a great way to share them!</h3>
          <Link href={"/Posts"}>
            <button className=" p-2 px-4 bg-newbg mobile:bg-newtext mobile:text-newbg duration-300 hover:bg-newtext hover:text-newbg hover:scale-105 font-bold text-xl rounded-lg shadow-2xl">SEE BLOG POSTS</button>
          </Link>
        </div>
        <div className="absolute top-12 left-[5%] scale-75 bigscreen:scale-100 bigscreen:top-24 bigscreen:left-[8%] mobile:hidden">
          <Image className="pointer-events-none" src={illu} alt="illustrator" />
        </div>
      </div>
      <div className="relative min-h-screen w-full bg-[url('/bgr.png')] bg-[size:100%_100%] bg-no-repeat mobile:bg-[size:100%_25%] mt-0">
        <div className="w-full flex flex-col justify-center items-center gap-24 mobile:gap-12 pt-12 bigscreen:pt-32">
          <h1 className="text-4xl bigscreen:scale-125 mobile:text-3xl cursor-default rounded-md bg-newtext text-newbg p-3 font-semibold text-center mx-auto">See Recent Posts!</h1>
          <div className="w-9/12 mobile:w-11/12 flex mobile:flex-col justify-center items-center gap-20 mobile:gap-8 pb-24">
            {posts?.length > 3 ?
              posts.slice(0, 3).map((each, i) => (
              <BlogCard post={each} key={i} />
              ))
              :
              posts.map((each, i) => (
              <BlogCard post={each} key={i} />
              ))
            }
          </div>
        </div>
      </div>  
    </main>
  )
}

export default Hero