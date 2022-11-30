import { useState, useRef, useEffect } from 'react'
import loadergif from '../src/assets/loading.gif'
import Layout from '../src/components/Layout'
// next
import { useRouter } from 'next/router'
import Image from 'next/image'
// firebase
import { auth, db } from '../src/firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'

const CreatePost = () => {
  const router = useRouter()
  const [loading,setLoading] = useState(false)
  const [hashtags, setHashtags] = useState([])
  const [textLetter,setTextLetter] = useState(0)
  const blogtext = useRef()

  useEffect(() => {
    setLoading(true)
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push('/')
      else setLoading(false)
    })
  }, []);
  
  const addHashtag = (e) => {
    e.preventDefault()
    const hashtagInput = e.target.previousElementSibling

    if (hashtagInput.value.length > 1 && hashtagInput.value.length < 20) {
      let eachHashtagValue = hashtagInput.value
      hashtagInput.style.outline = "none"
      setHashtags([...hashtags, eachHashtagValue[0].toUpperCase() + eachHashtagValue.slice(1,eachHashtagValue.length).toLowerCase()])
      hashtagInput.value = ""
    }
    else hashtagInput.style.outline = "2px solid red"
  }

  const removeHashtag = (e) => {
    setHashtags(hashtags.filter((each)=> e.target.innerText !== `#${each}`))
  }

  const postsCollectionRef = collection(db, "posts")
  const createPost = async (post) => {
    setLoading(true)
    await addDoc(postsCollectionRef, post)
    setLoading(false)
    router.push('/')
    setTimeout(() => {window.location.reload()} , 500 )
  }

  const formHandler = (e) => {
    e.preventDefault()
    const blogTitle = e.target[0].value
    const blogDescription = e.target[1].value 
    const blogCategory = e.target[2].value 
    const blogContent = e.target[5].value

    if (blogCategory === "DEFAULT") blogCategory = "Other"

    if (blogDescription.length === 0) {
      let counter = blogContent.split(" ")
      let newDescription = counter.length > 20 ? counter.slice(0, 20) : counter.slice(0, counter.length - 1)
      blogDescription = newDescription.join(" ")
      if (blogDescription.length > 150) blogDescription = blogDescription.slice(0,150)
      blogDescription += "..."
    } 

    if (blogTitle.length >= 2 && blogTitle.length <= 50 && blogContent.length >= 100 ) {
      let post = {
        title: blogTitle,
        description: blogDescription,
        category: blogCategory,
        hashtags,
        text: blogContent,
        author: {
          name: auth.currentUser.displayName ,
          id: auth.currentUser.uid
        }
      }
      createPost(post)
    } else console.log("Error, please check inputs")
  }

  return (
    <Layout>
      <main>
        <h1 className="text-4xl mb-3 font-bold">Create a blog post</h1>
        <h2 className="text-xl mb-8 font-semibold">Flow your thoughts, feelings and experiences into the text</h2>
        <form onSubmit={formHandler} className="flex flex-col gap-4 mt-4 w-full border-2 p-5 mobile:p-2 border-bhover rounded-sm mb-16 relative">
          <div className="flex flex-col gap-2">
            <label className="block font-bold">Blog Title</label>
            <input minLength={2} maxLength={50} className="w-[500px] mobile:w-full p-2 rounded-md text-black invalid:outline-red-400" type="text" placeholder="Enter Your Blog Title" required/>
          </div>
          <div className="flex flex-col gap-2">
            <label className="block font-bold">Blog Description (Optional)</label>
            <textarea minLength={30} maxLength={150}  className="p-2 resize-none rounded-md text-black invalid:outline-red-400" rows="2" type="text" placeholder="Write a description about your blog"></textarea>
            <small className="text-gray-500 dark:text-slate-300">If you don't write description, the first 20 word of your blog post will shown on description</small>
          </div>
          <div className="flex justify-between mobile:flex-col mobile:px-0 mobile:gap-7">
            <div className="flex flex-col gap-8">
              <label className="block font-bold">Blog Category</label>
              <select className="w-96 mobile:w-full p-2 cursor-pointer text-black rounded-md" defaultValue={'DEFAULT'}>
                <option value="DEFAULT" disabled>Choose a Topic</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Life">Life</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 min-h-[160px]">
              <label className="block font-semibold">Create hashtags (Optional)</label>
              <small className="text-gray-500 dark:text-slate-300">You can delete by clicking on them</small>
              <div className="relative">
                <input minLength={2} className="p-2 inline-block w-full rounded-md text-black" type="text" placeholder="Write what's your blog about" />
                <button onClick={addHashtag} className="absolute bottom-1.5 right-4 hover:brightness-110 active:scale-95 text-xl bg-slate-500 text-white px-2 rounded-md">+</button>
              </div>
              <div className="flex flex-wrap gap-2 w-[500px] mobile:w-full mt-2">
                {hashtags.map((each, i) =>
                  <div onClick={removeHashtag} className="flex gap-1 border-2 p-2 border-gray-400 rounded-md cursor-pointer hover:border-red-500 hover:bg-white" key={i}>
                    #{each}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 relative">
            <label className="block font-bold">Blog Text</label>
            {textLetter > 0 & textLetter < 100 ?
              <span className="absolute top-0 text-red-500 left-32 mobile:left-20 mobile:text-xs mobile:top-1">
                Please enter at least {100 - textLetter} more character.
              </span>
              : null
            }
            <textarea ref={blogtext} onChange={(e) => setTextLetter(e.target.value.length)} minLength={100} className="w-full rounded whitespace-pre overflow-y-auto p-3 resize-none text-black invalid:outline-red-400" rows="10" cols="33" placeholder="Write down your post" required></textarea>
            <small className="text-gray-500 dark:text-slate-300">This website is created for learning purposes. Please make sure to save your blog text locally or somewhere else. </small>
          </div>
          <div className="w-full flex gap-2 justify-end items-center font-bold mobile:flex-row-reverse">
            <button type="submit" className="bg-bhover hover:bg-green-400 text-white rounded-md p-2 px-12 mobile:w-full duration-300 active:scale-95">Submit</button>
            <button type="reset" onClick={() => { setHashtags([]); setTextLetter(0) }} className="bg-white text-bhover border-bhover hover:border-red-700 hover:bg-red-700 hover:text-white border-2 rounded-md py-1.5 px-8 duration-300 hover:brightness-125 active:scale-95">Reset</button>
          </div>
          {loading ?
            <div className="absolute top-0 right-0 w-full h-full bg-black/30">
              <div className="absolute blur-none bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2">
                <Image src={loadergif} alt='loader' />
              </div>
            </div>
          : null}
        </form>
      </main>
    </Layout>
  )
}

export default CreatePost