"use client"
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import CarInspection from "../../../public/car-inspection-icon.svg"
import CarInsurance from "../../../public/car-insurance-icon.svg"
import AccidentIcon from "../../../public/accident-icon.svg"
// import CarIllustration from "../../../public/car-illustration.svg"
import CarRepair from "../../../public/car-repair.svg"
import Navbar from '@/components/Navbar';
import Menu from '@/components/Menu';
import Container from '@/components/Container';
import CarCard from '@/components/CarCard';
import InfoCard from '@/components/InfoCard';

const images: string[] = [CarInspection, CarInsurance, CarRepair, AccidentIcon]


export type UserProps = {
  name: string,
  email: string,
  image: string
}

export type MenuHandler = "principal" | "add" | "expires" | "car" | "add" | "edit"

export interface ContainerInfo {
  menuType: MenuHandler,
  carId: string | null
}

interface FuncHandler {
  changeContainer: (container: MenuHandler, carId: string | null) => void
}
  

const Page = () => {
  
  const { data, status }  = useSession();
  
  const initContainer: ContainerInfo = {
    menuType: "principal",
    carId: null
  }  
    
  const initUser = {
    name: "",
    email: "",
    image: ""
  }
  
  const [containerHandler, setContainerHandler] = useState<ContainerInfo>(initContainer) 
  const [user, setUser] = useState<UserProps>(initUser)
  
    useEffect(() => {
      console.log(containerHandler)
    }, [containerHandler])
    
    console.log(containerHandler)

  
  const changeContainer: FuncHandler['changeContainer'] = (container: MenuHandler, id: string | null) => {
    switch (container) {
      case "principal": {
        setContainerHandler(initContainer)
        break
      }
      case "add": {
        setContainerHandler({menuType: "add", carId: null })
        break
      }
      case "expires": {
        setContainerHandler({menuType: "expires", carId: null})
        break
      }
      case "car": {
        setContainerHandler({menuType: "car", carId: id})
        break
      }
    }
  }
  
  

  useEffect(() => {
    if (status === "authenticated") {
      const user: UserProps = data.user as UserProps 
      setUser(user)
    }
    else if (status === "unauthenticated") {
      redirect("/")
    }
  }, [data, status])
  

  
  return (
      <div className="flex w-full justify-center sm:grid sm:grid-cols-12 sm:gap-4">
        <div className="col-span-2 mt-16">
          <Menu changeContainer={changeContainer}/>
        </div>
        <div className="col-span-8">
          <Navbar user={user} />
          <ContainerSelect changeContainer={changeContainer} user={user} status={status} container={containerHandler}/>
        </div>
      </div>
  )
}

type ContainerSelectProps = {
  container: ContainerInfo,
  user: UserProps,
  status: string
  changeContainer: (container: MenuHandler, carId: string | null) => void
}

function ContainerSelect({container, user, status, changeContainer}: ContainerSelectProps) {
    
  if (container.menuType === "principal") {
    return (
      <Container>
      {status === "authenticated" && <h2 className="text-lg my-4 ml-4"> Welcome, <span className="text-primary">
      {user.name}! </span> You have currently 3 cars registered.
      </h2>}
        <div className="flex flex-col max-w-2xl p-2 w-full mx-auto" onLoad={(e: React.ChangeEvent<HTMLDivElement>) => e.preventDefault()}>         
          <div className="carousel flex">
          <div id="1" className="carousel-item w-full md:w-1/2">
            <CarCard/>
          </div> 
          <div id="2" className="carousel-item w-full md:w-1/2">
            <CarCard/>
          </div> 
          <div id="3" className="carousel-item w-full">
            <CarCard/>
          </div> 
          <div id="4" className="carousel-item w-full">
            <CarCard/>
          </div>
        </div> 
        <div className="flex justify-center bg-neutral rounded-lg w-full py-2 gap-2">
          <a href="#1" className="btn btn-xs bg-neutral text-white">1</a> 
          <a href="#2" className="btn btn-xs bg-neutral text-white">2</a> 
          <a href="#3" className="btn btn-xs bg-neutral text-white">3</a> 
          <a href="#4" className="btn btn-xs bg-neutral text-white">4 </a>
        </div>
      </div>
        <div className="flex flex-col xl:flex-row mx-auto lg:w-1/2 xl:w-full gap-2 xl:gap-4 mt-8 xl:mt-8 selection:bg-transparent">
          <InfoCard img={images[0]} text='Add a new car to your account' textButton='Add' hasLink={true} changeContainer={changeContainer} container='add' id={null} />
          <InfoCard img={images[1]} text='Add a reminder for a car' textButton='Set reminder' changeContainer={changeContainer} container='add' id={null} hasLink={false}/>
          <InfoCard img={images[2]} text='Edit a car' textButton='Edit' changeContainer={changeContainer} container='edit' id={null} hasLink={true}/>
          <InfoCard img={images[3]} text='See what expires next' textButton='See insurances' changeContainer={changeContainer} container='expires' id={null} hasLink={false}/>
        </div>
      {/* <Image src={Imaged} alt="t" width="100" height="100"/> */}
      </Container>
    )
  }
  else if (container.menuType === "add") {
    redirect("/add")
  }
  else if (container.menuType === "car") {
    return (
      <Container>
        <div className="">
          <p> test </p>
        </div>
      </Container>
    )
  }
  else {
    return (
      <Container>
      <p> Expires </p>
      </Container>
    )
  }
}

export default Page