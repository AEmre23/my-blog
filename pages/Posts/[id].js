import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../src/components/Layout'


const Id = () => {
  const posts = useSelector((state) => state.posts.value.data)
  const router = useRouter()
  const { id } = router.query
  const pagePost = posts.find((each) => each.id === id)

  return (
    <Layout>
      <div className="flex flex-col gap-3 ">
        <div className="font-bold text-2xl">{pagePost?.title}</div>
        <div className="">{pagePost?.description}</div>
        <div className="">Author:{pagePost?.author.name}</div>
        <div className="">{pagePost?.text}</div>
      </div>
    </Layout>
  )
}

export default Id