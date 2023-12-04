"use client"
import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { UserProps } from '../main/page'
import Container from '@/components/Container'
import Illustration from "@/../public/car-illustration.svg"
import CarInsurance from "@/../public/car-insurance.svg"
import Image from 'next/image'
import { Calendar } from "react-calendar" 
import 'react-calendar/dist/Calendar.css'
import Menu from '@/components/Menu'
import { changeContainer } from '@/misc/changeContainer'

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type Calendar = {
  id: number,
  value: Value
}

export type Car = {
    id?: string,
    model: string,
    colour: string,
    carplate: string,
    insurance: string,
    itp: string,
    vignette: string,
}



const Page = () => {
  
  const [value, onChange] = useState<Value>(new Date());
  const [calendarNum, setCalendarNum] = useState<number>(0);
  const [createCar, setCreateCar] = useState<Car>({
    model: "",
    colour: "",
    carplate: "",
    insurance: "",
    itp: "",
    vignette: ""
  })
  
  const [error, setError] = useState<string | null>(null)
  
  const refInsurance = useRef<HTMLInputElement | null>(null)
  const refITP = useRef<HTMLInputElement | null>(null)
  const refRovigniette = useRef<HTMLInputElement | null>(null)
  
  console.log(createCar)
  
  useEffect(() => {
    if (calendarNum === 1) {
    
      refInsurance.current!.value = value?.toLocaleString().split(",")[0] ?? '';
      setCreateCar(prevCreateCar => ({
        ...prevCreateCar, insurance: refInsurance.current!.value      
      }))
    }
    if (calendarNum === 2) {
      refITP.current!.value = value?.toLocaleString().split(",")[0] ?? '';
      setCreateCar(prevCreateCar => ({
        ...prevCreateCar, itp: refITP.current!.value      
      }))
    }
    if (calendarNum === 3) {
      refRovigniette.current!.value = value?.toLocaleString().split(",")[0] ?? '';
      setCreateCar(prevCreateCar => ({
        ...prevCreateCar, vignette: refRovigniette.current!.value      
      }))
    }
  }, [value, calendarNum]);
  
  
    const focusElement = (id: number) => {
      setCalendarNum(id)
    }
    const { data, status } = useSession()
    
    useEffect(() => {
      if (status === "unauthenticated") {
        window.location.href = "/"
      }
    }, [status])
  
    const createCarHandler = (e: ChangeEvent<HTMLInputElement>, type: keyof Car) => {
          if (e.target.value !== null && e.target.value !== undefined) {
            if (e.target.value.length >= 3 && e.target.value.length < 40) {
              setCreateCar(prevCreateCar => ({ ...prevCreateCar, [type]: e.target?.value }))        
            }
          }        
    }
    
  
    
    const onSend = async () => {
      const control = Object.values(createCar).every((value) => value !== "")
      if (control) {
        const d = await fetch("http://localhost:3000/api/car", {
          method: "POST",
          body: JSON.stringify({ "carDetails": createCar, "name": data?.user?.name } )
        }).then(res => console.log(res))
        .then(() => (window.location.href = "/main"))
        .catch(err => console.log(err))      
      }
      
      setError("Please fill in all the fields")
    }
    
    console.log(createCar)
    

  if (status === "authenticated") {
    return (
      <div className="flex w-full justify-center sm:grid sm:grid-cols-12 sm:gap-4">
        <div className="col-span-2 mt-16">
          <Menu changeContainer={changeContainer} />
        </div>
        <div className="col-span-8">
          <Navbar user={data?.user as UserProps} />
          <Container>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col flex-1 justify-center items-center ">
                <h2 className='text-primary text-center font-bold text-[2rem]'> Add a car </h2> 
              <div className="form-control w-full flex justify-center items-center max-w-md gap-2 bg-primary p-6 rounded-lg mt-4">
                <label className="label">
                  <span className="label-text text-white">Car model</span>
                </label>
                <input type="text" placeholder="Type here" maxLength={40} className="input input-bordered w-full max-w-xs" onChange={(e: ChangeEvent<HTMLInputElement>) => createCarHandler(e, "model")} />
                <label className="label">
                  <span className="label-text text-white">Carplate</span>
                </label>
                <input type="text" placeholder="Type here" maxLength={40} className="input input-bordered w-full max-w-xs" onChange={(e: ChangeEvent<HTMLInputElement>) => createCarHandler(e, "carplate")}/>
                <label className="label">
                  <span className="label-text text-white"> Colour </span>
                </label>
                <input type="text" placeholder="Type here" maxLength={40} className="input input-bordered w-full max-w-xs" onChange={(e: ChangeEvent<HTMLInputElement>) => createCarHandler(e, "colour")} />
                <label className="label">
                  <span className="label-text text-white"> Insurance expries </span>
                </label>
                <input ref={refInsurance}  type="text" maxLength={10} disabled={calendarNum === 1 ? true : false} onFocus={() => focusElement(1)} placeholder="Add expire date" className="input input-bordered w-full max-w-xs" />
                {calendarNum === 1 ? <Calendar minDate={new Date()}  className={'bg-primary p-3'} onChange={onChange} value={value}/> : null}              
                <label className="label">
                  <span className="label-text text-white"> ITP expires </span>
                </label>
                <input ref={refITP} type="text" maxLength={10} disabled={calendarNum === 2 ? true : false}  onFocus={() => focusElement(2)} placeholder="Add expire date" className="input 
                input-bordered w-full max-w-xs" />
                {calendarNum === 2 ? <Calendar minDate={new Date()}  className={'bg-primary p-3'} onChange={onChange} value={value ? value : null}/> : null}              
                <label className="label">
                  <span className="label-text text-white"> Rovigniette  </span>
                </label>
                <input ref={refRovigniette} type="text" maxLength={40} disabled={calendarNum === 3 ? true : false}  onFocus={() => focusElement(3)} placeholder="Add expire date" className="input 
                input-bordered w-full max-w-xs"/>
                {calendarNum === 3 ? <Calendar minDate={new Date()} className={'bg-primary p-3'} onChange={onChange} value={value}/> : null}
                <button className="btn btn-neutral mt-4" onClick={() => onSend()}> Testing </button>
              </div>
              </div>
              <div className="flex flex-1 flex-col justify-center items-center"> 
              <Image src={Illustration} alt="illustration" width="600" height="500"/>
              <Image src={CarInsurance} alt="insurance" width="600" height="500" />
              </div>
            </div>
          </Container>
        </div>
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