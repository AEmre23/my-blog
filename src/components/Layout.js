
const Layout = ({children}) => {
  return (
    <div
      className="w-full flex justify-center mt-28 mobile:mt-0 mobile:pt-28 bigscreen:mt-44">
      <div className="w-9/12 mobile:w-11/12">
        {children}
      </div>
    </div>
  )
}

export default Layout