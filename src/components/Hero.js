import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'
import BlogCard from './BlogCard'
import { useSelector } from 'react-redux'


const Hero = () => {
  const posts = useSelector((state) => state.posts.value.sortedData)
  // const [postList, setPostList] = useState([])
  // const [loading,setLoading] = useState(false)
  // const postsCollectionRef = collection(db, "posts")

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef)
  //     setLoading(false)
  //     setPostList(data.docs.map((doc)=>({...doc.data(), id:doc.id})))
  //   }
  //   getPosts()
  // }, []);

  return (
    <main className="bg-newbg">
      <div className="min-h-[calc(100vh_-_74px)] w-full bg-[url('/bg.png')] bg-[size:100%_100%] bg-no-repeat relative font-rubik">
        <div className="absolute left-[8%] top-[12%] mobile:top-[6%] mobile:left-[6%]">
          <h1 className="text-5xl font-bold">What's on your mind?</h1>
          <h2 className= "text-4xl font-medium ml-10 mt-3 mobile:ml-0">Share with everyone!</h2>
        </div>
        <div className="absolute right-[10%] bottom-[12%] mobile:right-[1%] mobile:bottom-[16%] max-w-lg mobile:max-w-[230px]">
          <h3 className="text-4xl mobile:text-xl font-normal dark:text-white tracking-wide [word-spacing:20px] mobile:[word-spacing:0]">Putting  your thoughts into writing is a great way to share them!</h3>
        </div>
      </div>
      <div className="relative min-h-screen w-full bg-[url('/bgr.png')] bg-[size:100%_100%] bg-no-repeat mt-0">
        <div className="w-full flex flex-col justify-center items-center gap-24 mobile:gap-12 pt-12 bigscreen:pt-32">
          <h1 className="text-4xl mobile:text-3xl cursor-default rounded-md bg-gray-300/80 p-3 font-semibold text-center mx-auto">See the latest posts!</h1>
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