import React from 'react'

const Layout = ({children}) => {
  return (
    <div className="w-full flex justify-center mt-12 bigscreen:mt-32">
      <div className="w-9/12 mobile:w-11/12">
        {children}
      </div>
    </div>
  )
}

export default Layout