import { Car } from '@/app/add/page';
import React from 'react'
import { IoWarningOutline } from "react-icons/io5";


export type ExpireType = {
    expireCar?: Car,
    expireVignette?: boolean,
    expireITP?: boolean,
    expireInsurance?: boolean
}

const Expire = ({ expireCar, expireVignette, expireITP, expireInsurance }: ExpireType) => {

    const year = new Date();
    year.setFullYear(year.getFullYear() - 1);
    console.log(new Date().getTime() - year.getTime());
    
    const insPercent = Math.floor(((new Date().getTime() - year.getTime()) / (new Date(expireCar?.insurance as string).getTime() - year.getTime())) * 100);
    const itpPercent = Math.floor(((new Date().getTime() - year.getTime()) / (new Date(expireCar?.itp as string).getTime() - year.getTime())) * 100);
    const vignettePercent = Math.floor(((new Date().getTime() - year.getTime()) / (new Date(expireCar?.vignette as string).getTime() - year.getTime())) * 100);
    
    console.log(insPercent, itpPercent, vignettePercent)
    
    


  return (
    <div className="flex flex-col rounded-lg p-4 w-full bg-primary text-white">
        <p className="font-bold"> Model: <span className="font-light"> {expireCar?.model} ktr tr </span> </p>
        <p className="font-bold"> Carplate: <span className="font-light"> {expireCar?.carplate} </span>  </p>
        
        
        
       {expireInsurance ? <div className="flex flex-row bg-red-700 gap-y-2 text-primary items-center justify-center mt-2">
            <div className="flex-1 text-primary ml-4 items-center flex py-4 flex-row">
                <IoWarningOutline className="text-white text-3xl hidden lg:flex" />
                <p className="ml-2 font-bold text-white"> INSURANCE EXPIRED! - - - {expireCar?.insurance} </p>
            </div>
            <div className="flex flex-1 justify-end items-center p-2 mr-4">
            <div className="radial-progress text-white" style={{ "--value": "100", "--size": "4rem", "--thickness": "0.5rem" }} role="progressbar">100%</div>
            </div>        
        </div> : null }
        
        {expireITP ? <div className="flex flex-row bg-red-700 gap-y-2 text-primary items-center justify-center mt-2">
            <div className="flex-1 text-primary ml-4 items-center flex py-4 flex-row">
                <IoWarningOutline className="text-white text-3xl hidden lg:flex" />
                <p className="ml-2 font-bold text-white"> ITP EXPIRED! - - - {expireCar?.itp} </p>
            </div>
            <div className="flex flex-1 justify-end items-center p-2 mr-4">
            <div className="radial-progress text-white" style={{ "--value": "100", "--size": "4rem", "--thickness": "0.5rem" }} role="progressbar">100%</div>
            </div>        
        </div> : null }
        
        {expireVignette ? <div className="flex flex-row bg-red-700 gap-y-2 text-primary items-center justify-center mt-2">
            <div className="flex-1 text-primary ml-4 items-center flex py-4 flex-row">
                <IoWarningOutline className="text-white text-3xl hidden lg:flex" />
                <p className="ml-2 font-bold text-white"> VIGNETTE EXPIRED! - - - {expireCar?.vignette} </p>
            </div>
            <div className="flex flex-1 justify-end items-center p-2 mr-4">
            <div className="radial-progress text-white" style={{ "--value": "100", "--size": "4rem", "--thickness": "0.5rem" }} role="progressbar">100%</div>
            </div>        
        </div> : null }
        
    </div>
  )
}

export default Expire