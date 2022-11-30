import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState,useEffect,useRef } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../src/components/Layout'
import ImagePicker from '../../src/data/categoryImages'
import avatar from  "../../src/assets/avatar.jpg"
import Link from 'next/link'
import { BiDownArrow } from "react-icons/bi"
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../src/firebase-config'

const Id = () => {
  const [isAuthor, setIsAuthor] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const openable = useRef()
  const posts = useSelector((state) => state.posts.value.data)
  const user = useSelector((state) => state.user.value)
  const router = useRouter()
  const { id } = router.query
  const pagePost = posts.find((each) => each.id === id)
  console.log(pagePost);

  const textOpener = (e) => {
    setIsDetailOpen(!isDetailOpen)
    let textSection = e.currentTarget.nextElementSibling
    if (textSection.style.maxHeight) textSection.style.maxHeight = null;
    else textSection.style.maxHeight = textSection.scrollHeight + "px"
  }

  const deletePost = async () => {
    const postDoc = doc(db, "posts", pagePost?.id)
    await deleteDoc(postDoc)
    console.log("Post Deleted")
    router.push("/Posts")
    setTimeout(() => { window.location.reload()},1000)
  }

  useEffect(() => {
    if(user.id === pagePost?.author.id) setIsAuthor(true)
  }, []);

  return (
    <Layout>
      <main>
        {pagePost === undefined ?
          <p className="text-3xl font-bold">Post not found.<br />Return to <Link href="/Posts"><span className="underline cursor-pointer" >Posts page.</span></Link></p>
        :
        <div className="p-8 mobile:px-2 shadow-md w-full mb-12 flex mobile:flex-col-reverse items-start gap-2 border-newtext border-2 rounded bg-white/90">
          <div className="flex flex-col gap-3 w-3/4 mobile:w-full font-rubik ">
            <div className="h-[395px] bigscreen:h-[500px] mobile:w-[310px] mobile:h-[160px] relative mb-6 w-full rounded overflow-hidden">
              <Image src={ImagePicker(pagePost?.category)} layout="fill" alt="category-image" />
              </div>
            <div className="flex mobile:flex-col-reverse pb-6 mobile:-mt-5 items-center justify-between">
              <h1 className="font-bold px-2 mobile:px-1 text-3xl">{pagePost?.title}</h1>
              <div className="border-2 mobile:mb-4 border-newtext text-lg p-2 rounded-full px-4">{pagePost?.category}</div>
            </div>
            <article className="leading-7 mobile:leading-6 px-2 mobile:px-1 first-letter:text-2xl first-letter:text-bhover">{pagePost?.text}</article>
          </div>
          <div className="sticky top-20 w-1/4 mobile:hidden flex items-center">
            <div className="p-3 mx-4 rounded-lg flex flex-col">
              <Image className="rounded-full" src={avatar} alt="avatar" />
              <div className="mt-6 text-center">
                <div className="text-xl text-gray-500">Author</div>
                <h3 className="text-2xl font-bold">{pagePost?.author.name}</h3>
                {isAuthor ? <small>You</small> : null}
              </div>
              <div className="p-2 mt-8 flex flex-col gap-4 rounded border-2 border-l-text">
                <div className="text-center">
                  <div className="font-semibold text-lg border-b-2 pb-1 mb-4">Description</div>
                  <div className="italic leading-5">{pagePost?.description}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pagePost?.hashtags.map((each, inx) => (
                    <div key={inx} className="border-2 font-semibold border-newtext px-2 text-sm py-1 rounded cursor-pointer hover:bg-newtext hover:text-white duration-200">
                      #{each}
                    </div>
                  ))}
                </div>
              </div>
              {(isAuthor | user.email === "ahmetemre1998@hotmail.com") ?
                <button onClick={deletePost} className="px-4 py-2 bg-red-700 mt-4 rounded-lg text-white duration-200 hover:bg-red-800">Delete this post</button>
                : null}
            </div>
          </div>
            <div className={`${isDetailOpen ? "mb-4" : ""} hidden mobile:block p-2 -mt-2 border-2 w-full border-newtext rounded`}>
              <div onClick={textOpener} className={`${isDetailOpen ? "border-b-2 border-newtext pb-2 mb-2" : ""} flex items-center justify-between duration-300`}>
                <div className="font-bold text-lg">Blog Detail</div>
                {isDetailOpen ? <BiDownArrow className="duration-300" /> : <BiDownArrow className="rotate-180 duration-300" />}
              </div>
              <div ref={openable} className={`max-h-0 overflow-hidden duration-300 flex flex-col gap-3`}>
                <div className="flex gap-2 items-center mt-2 rounded-2xl bg-bhover text-white border p-2">
                  <Image className="rounded-full" width={30} height={30} src={avatar} alt="avatar" />
                  <div className="font-semibold">{pagePost?.author.name}</div>
                </div>
                <div className="leading-4 italic">{pagePost?.description}</div>
                <div className="flex flex-wrap gap-2">
                  {pagePost?.hashtags.map((each, inx) => (
                    <div key={inx} className="border-2 font-semibold border-newtext px-2 text-xs py-1 rounded cursor-pointer hover:bg-newtext hover:text-white duration-200">
                      #{each}
                    </div>
                  ))}
                </div>
                {(isAuthor | user.email === "ahmetemre1998@hotmail.com") ?
                <button onClick={deletePost} className="px-4 py-2 bg-red-700 mt-2 rounded-lg text-white">Delete this post</button>
                : null}
              </div>
            </div>
        </div>
        }
      </main>
    </Layout>
  )
}

export default Id