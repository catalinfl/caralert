import React from 'react'

const Container = ({children}: { children: React.ReactNode}) => {
  return (
    <div className="bg-white p-2 md:p-4 max-w-lg xs:max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl w-full mx-auto mt-2 rounded-lg"> 
      {children}
    </div>
  )
}

export default Container