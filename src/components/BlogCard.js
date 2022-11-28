import Image from 'next/image'
import React from 'react'
import loader from '../assets/loading.gif'
import ImagePicker from '../data/categoryImages'
import avatar from '../assets/avatar.jpg'
import Link from 'next/link'

const BlogCard = ({ post }) => {
  return (
    <Link href={`/Posts/${post.id}`}>
      <div className="w-72 flex flex-col gap-2 border-2 font-rubik cursor-pointer duration-300 hover:scale-105 shadow-[rgba(50,_50,_93,_0.25)_0px_13px_27px_-5px,_rgba(0,_0,_0,_0.3)_0px_8px_16px_-8px] rounded-xl bg-white p-4">
        <div className="w-full h-[200px] relative">
          <Image className="rounded-sm" src={ImagePicker(post.category)} layout="fill" alt="category-image" />
          <div className="absolute z-10 bottom-1 right-1 bg-newbg p-1 px-3 rounded-2xl shadow-2xl">{post.category}</div>
        </div>
        <div className=" rounded-md p-1 flex flex-col gap-2">
          <div className="text-xl mb-2 font-semibold min-h-[56px]">{post.title}</div>
          <div className="text-gray-500 h-[120px] mobile:text-sm mobile:h-[100px]">{post.description}</div>
        </div>
        <div className="flex gap-3 items-center">
          <Image className="rounded-full" src={avatar} width={45} height={45} alt='avatar' />
          <div className="text-lg">{post.author.name}</div>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard