"use client"
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { UserProps } from '../main/page'
import Container from '@/components/Container'
import Illustration from "@/../public/car-illustration.svg"
import Image from 'next/image'
import { Calendar } from "react-calendar" 

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Page = () => {
  
  const [value, onChange] = useState<Value>(new Date());


  const focusElement = () => {
        console.log("pressed")
  }


  const { data, status } = useSession()
  if (status === "authenticated") {
    return (
      <div className="">
        <Navbar user={data?.user as UserProps} />
        <Container>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col flex-1 justify-center items-center ">
              <h2 className='text-primary text-center font-bold text-[2rem]'> Add a car </h2> 
            <div className="form-control w-full flex justify-center items-center max-w-md gap-2 bg-primary p-6 rounded-lg mt-4">
              <label className="label">
                <span className="label-text text-white">Car model</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
              <label className="label">
                <span className="label-text text-white">Carplate</span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
              <label className="label">
                <span className="label-text text-white"> Colour </span>
              </label>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
              <label className="label">
                <span className="label-text text-white"> Insurance expries </span>
              </label>
              <input type="text" placeholder="Add date" className="input input-bordered w-full max-w-xs" />
              <label className="label">
                <span className="label-text text-white"> ITP expires </span>
              </label>
              <input type="text" placeholder="Add date" className="input 
              input-bordered w-full max-w-xs" />
                    <label className="label">
                <span className="label-text text-white"> Rovigniette  </span>
              </label>
              <input type="text" onFocus={() => focusElement()} placeholder="Add date" className="input 
              input-bordered w-full max-w-xs" />
              <button className="btn btn-secondary mt-4"> test boss </button>
              <Calendar className={'bg-white p-3'} onChange={onChange} value={value}/>
            </div>
            </div>
            <div className="flex flex-1 flex-col justify-center items-center"> 
            <Image src={Illustration} alt="illustration" width="600" height="500"/>
            </div>
          </div>
        </Container>
      </div>
    )  
  }
  
  if (status === "loading") {
    return (
      <Container>
        <p> Wait... Page is loading</p>
      </Container>
    )
  }
}

export default Page