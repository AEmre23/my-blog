import { useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../src/components/Layout'
import BlogCard from '../../src/components/BlogCard'


const Index = () => {
  const posts = useSelector((state) => state.posts.value.data)
  const categories = ["All","Technology", "Design", "Food", "Travel", "Life", "Other"]
  const [filter, setFilter] = useState("All")

  const filterCategory = (e) => {
    const catgs = document.getElementsByName("categories")
    catgs.forEach(e => e.classList.remove("selected"))
    e.target.classList.add("selected")
    setFilter(e.target.innerText)
  }
  
  return (
    <Layout>
      <div className="w-full">
        <h1 className="text-4xl text-center text-bhover font-bold mb-12">You can view all posts here</h1>
        <div className="flex flex-wrap items-center mobile:gap-3 mobile:text-xs gap-10 text-lg border-b-2 mb-16 mobile:mb-8 pb-2 border-gray-400">
          {categories.map((each, idx) => (
            <div name="categories" onClick={filterCategory} className={`${each === "All" ? "selected" : "" } cursor-pointer duration-200 hover:scale-105`} key={idx}>{each}</div>
          ))}
        </div>
        <div className="flex w-full justify-center items-center">
          <div className="flex flex-wrap mobile:flex-col gap-20 items-center mobile:gap-8 pb-24 mobile:pb-12">
            {posts?.filter((value) => {
              if (filter === "All") return value
              else if (value.category === filter) return value
            }).map((each, i) => (
              <BlogCard post={each} key={i} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Index