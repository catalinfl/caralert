"use client"
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { UserProps } from '../main/page'
import Container from '@/components/Container'
import Illustration from "@/../public/car-illustration.svg"
import CarInsurance from "@/../public/car-insurance.svg"
import Image from 'next/image'
import { Calendar } from "react-calendar" 
import 'react-calendar/dist/Calendar.css'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Calendar = {
  id: number,
  value: Value
}


const Page = () => {
  
  const initCalendar: Calendar[] =
  [
    {
    id: 1,
    value: null
    },
    {
    id: 2,
    value: null
    },
    {
    id: 3,
    value: null
    }
  ]
  
  const [value, onChange] = useState<Value>(new Date());
  const [calendarNum, setCalendarNum] = useState<number>(0);

  const refInsurance = useRef<HTMLInputElement | null>(null)
  const refITP = useRef<HTMLInputElement | null>(null)
  const refRovigniette = useRef<HTMLInputElement | null>(null)
  
  useEffect(() => {
    if (calendarNum === 1) {
      refInsurance.current!.value = value?.toLocaleString().split(",")[0] ?? '';
    }
    if (calendarNum === 2) {
      refITP.current!.value = value?.toLocaleString().split(",")[0] ?? '';
    }
    if (calendarNum === 3) {
      refRovigniette.current!.value = value?.toLocaleString().split(",")[0] ?? '';
    }
  }, [value, calendarNum]);
  
  
    const focusElement = (id: number) => {
      setCalendarNum(id)
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
              <input ref={refInsurance} type="text" onFocus={() => focusElement(1)} placeholder="Add expire date" className="input input-bordered w-full max-w-xs" />
              {calendarNum === 1 ? <Calendar minDate={new Date()}  className={'bg-primary p-3'} onChange={onChange} value={value}/> : null}              
              <label className="label">
                <span className="label-text text-white"> ITP expires </span>
              </label>
              <input ref={refITP} type="text" onFocus={() => focusElement(2)} placeholder="Add expire date" className="input 
              input-bordered w-full max-w-xs" />
              {calendarNum === 2 ? <Calendar minDate={new Date()}  className={'bg-primary p-3'} onChange={onChange} value={value ? value : null}/> : null}              
              <label className="label">
                <span className="label-text text-white"> Rovigniette  </span>
              </label>
              <input ref={refRovigniette} type="text" onFocus={() => focusElement(3)} placeholder="Add expire date" className="input 
              input-bordered w-full max-w-xs"/>
              {calendarNum === 3 ? <Calendar minDate={new Date()} className={'bg-primary p-3'} onChange={onChange} value={value}/> : null}
              <button className="btn btn-secondary mt-4"> Testing </button>
            </div>
            </div>
            <div className="flex flex-1 flex-col justify-center items-center"> 
            <Image src={Illustration} alt="illustration" width="600" height="500"/>
            <Image src={CarInsurance} alt="insurance" width="600" height="500" />
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