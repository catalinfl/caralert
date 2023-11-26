import React from 'react'
import { IoWarningOutline } from "react-icons/io5";

const Expire = () => {
  return (
    <div className="flex flex-col rounded-lg p-4 w-full bg-primary text-white">
        <p className="font-bold"> Model: <span className="font-light"> test model </span> </p>
        <p className="font-bold"> Carplate: <span className="font-light"> AG 35 BLM </span>  </p>
        <div className="flex flex-row bg-white gap-y-2 text-primary items-center justify-center mt-2">
            <div className="flex-1 text-primary ml-4 items-center flex py-4 flex-row">
                <IoWarningOutline className="text-primary text-3xl hidden lg:flex" />
                <p className="ml-2 font-bold"> Rovignette expires in 25 days - 30.12.2025 </p>
            </div>
            <div className="flex flex-1 justify-end items-center p-2 mr-4">
            <div className="radial-progress" style={{ "--value": "80", "--size": "4rem", "--thickness": "0.5rem" }} role="progressbar">70%</div>
            </div>        
        </div>
        <div className="flex flex-row bg-white gap-y-2 text-primary items-center justify-center mt-2">
            <div className="flex-1 text-primary ml-4 items-center flex py-4 flex-row">
                <IoWarningOutline className="text-primary text-3xl hidden lg:flex" />
                <p className="ml-2 font-bold"> Rovignette expires in 25 days - 30.12.2025 </p>
            </div>
            <div className="flex flex-1 justify-end items-center p-2 mr-4">
            <div className="radial-progress" style={{ "--value": "80", "--size": "4rem", "--thickness": "0.5rem" }} role="progressbar">70%</div>
            </div>        
        </div>
    </div>
  )
}

export default Expire