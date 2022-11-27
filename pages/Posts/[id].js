import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../src/components/Layout'


const Id = () => {
  const posts = useSelector((state) => state.posts.value.sortedData)
  const router = useRouter()
  const { id } = router.query
  const pagePost = posts.filter((each) => each.id === id)

  return (
    <Layout>
      <div className="flex flex-col gap-3 ">
        <div className="font-bold text-2xl">{pagePost[0]?.title}</div>
        <div className="">{pagePost[0]?.description}</div>
        <div className="">Author:{pagePost[0]?.author.name}</div>
        <div className="">{pagePost[0]?.text}</div>
      </div>
    </Layout>
  )
}

export default Id