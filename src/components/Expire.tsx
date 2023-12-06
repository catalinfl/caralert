import { Car } from '@/app/add/page';
import React from 'react'
import { IoWarningOutline } from "react-icons/io5";


export type ExpireType = {
    expireCar?: Car,
    expireVignette?: boolean,
    expireITP?: boolean,
    expireInsurance?: boolean,
    insPercent: number,
    itpPercent: number,
    vignettePercent: number
}

const Expire = ({ expireCar, expireVignette, expireITP, expireInsurance, insPercent, itpPercent, vignettePercent }: ExpireType) => {

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
        
        {!expireInsurance && insPercent !== 100 && insPercent > 90 ?
        <div className="flex flex-row bg-yellow-400 gap-y-2 text-primary items-center justify-center mt-2">
            <div className="flex-1 text-primary ml-4 items-center flex py-4 flex-row">
                <IoWarningOutline className="text-white text-3xl hidden lg:flex" />
                <p className="ml-2 font-bold text-white"> ITP will expire soon - - - {expireCar?.insurance} </p>
            </div>
            <div className="flex flex-1 justify-end items-center p-2 mr-4">
            <div className="radial-progress text-white" style={{ "--value": insPercent.toString(), "--size": "4rem", "--thickness": "0.5rem" }} role="progressbar">{insPercent}%</div>
            </div>        
        </div>  : null 
        }
        
        {!expireITP && itpPercent !== 100 && itpPercent > 90 ?
        <div className="flex flex-row bg-yellow-400 gap-y-2 text-primary items-center justify-center mt-2">
            <div className="flex-1 text-primary ml-4 items-center flex py-4 flex-row">
                <IoWarningOutline className="text-white text-3xl hidden lg:flex" />
                <p className="ml-2 font-bold text-white"> ITP will expire soon - - - {expireCar?.itp} </p>
            </div>
            <div className="flex flex-1 justify-end items-center p-2 mr-4">
            <div className="radial-progress text-white" style={{ "--value": itpPercent.toString(), "--size": "4rem", "--thickness": "0.5rem" }} role="progressbar">{itpPercent}%</div>
            </div>        
        </div>  : null 
        }
        
        {!expireVignette && vignettePercent !== 100 && vignettePercent > 90 ?
        <div className="flex flex-row bg-yellow-400 gap-y-2 text-primary items-center justify-center mt-2">
            <div className="flex-1 text-primary ml-4 items-center flex py-4 flex-row">
                <IoWarningOutline className="text-white text-3xl hidden lg:flex" />
                <p className="ml-2 font-bold text-white"> Vignette will expire soon - - - {expireCar?.vignette} </p>
            </div>
            <div className="flex flex-1 justify-end items-center p-2 mr-4">
            <div className="radial-progress text-white" style={{ "--value": vignettePercent.toString(), "--size": "4rem", "--thickness": "0.5rem" }} role="progressbar">{vignettePercent}%</div>
            </div>        
        </div>  : null 
        }
        
    
        
    </div>        
  )
}

export default Expire