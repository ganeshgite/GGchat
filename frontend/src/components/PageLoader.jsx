import React from 'react'
import {Loader} from "lucide-react"

const PageLoader = () => {
  return (
    <>
        <div  className=" flex justify-center items-center h-screen w-full "  >
            <Loader className="size-10 animate-spin" /> 
        </div>
    </>
  )
}

export default PageLoader
  