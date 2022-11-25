import Image from 'next/image'
import React from 'react'
import loader from '../assets/loading.gif'
import ImagePicker from '../data/categoryImages'
import avatar from '../assets/avatar.jpg'

const BlogCard = ({ loading, post }) => {
  console.log(post);



  return (<>
    {loading ?
      <Image src={loader} alt="loader-gif" />
      :
      <div className="w-80 flex flex-col gap-2 border-2 font-rubik cursor-pointer duration-300 hover:scale-105 shadow-2xl rounded-lg bg-gray-300/80 p-2">
        <div className="w-full h-[200px] relative">
          <Image src={ImagePicker(post.category)} layout="fill" alt="category-image" />
          <div className="absolute z-10 bottom-2 right-2 bg-white/80 p-1 rounded-md shadow-lg">{post.category}</div>
        </div>
        <div className="bg-[#D9D9D9]/50 rounded-md p-1 flex flex-col gap-2">
          <div className="text-xl font-semibold">{post.title}</div>
          <div className="text-gray-500 h-[120px] mobile:text-sm mobile:h-[100px]">{post.description}</div>
        </div>
        <div className="flex gap-3 items-center">
          <Image className="rounded-full" src={avatar} width={45} height={45} alt='avatar' />
          <div className="text-lg">{post.author.name}</div>
        </div>
      </div>
    }
  </>)
}

export default BlogCard