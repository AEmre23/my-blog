import { useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../src/components/Layout'
import BlogCard from '../../src/components/BlogCard'


const index = () => {
  const posts = useSelector((state) => state.posts.value.sortedData)
  const categories = ["All","Technology", "Design", "Food", "Travel", "Social Media", "Life", "Other"]
  const [filter, setFilter] = useState("All")

  const filterCategory = (e) => {
    const catgs = document.getElementsByName("categories")
    catgs.forEach(e => e.classList.remove("selected"))
    e.target.classList.add("selected")
    setFilter(e.target.innerText)
  }
  
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-12">See all posts here</h1>
      <div className="flex flex-wrap items-center mobile:gap-3 mobile:text-sm gap-10 text-lg font-semibold border-b-2 mb-16 pb-2 border-gray-400">
        {categories.map((each, idx) => (
          <div name="categories" onClick={filterCategory} className={`${each === "All" ? "selected" : "" } cursor-pointer duration-200 hover:scale-105`} key={idx}>{each}</div>
        ))}
      </div>
      <div className="flex flex-wrap mobile:flex-col items-center gap-20 mobile:gap-8 pb-24">
        {posts?.filter((value) => {
          if (filter === "All") return value
          else if (value.category === filter) return value
        }).map((each, i) => (
          <BlogCard post={each} key={i} />
        ))}
      </div>
    </Layout>
  )
}

export default index