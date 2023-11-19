"use client"
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar';
import Menu from '@/components/Menu';
import Container from '@/components/Container';
import CarCard from '@/components/CarCard';
import InfoCard from '@/components/InfoCard';


export type UserProps = {
  name: string,
  email: string,
  image: string
}

export type MenuHandler = "principal" | "add" | "expires" | "car" 

interface ContainerInfo {
  menuType: MenuHandler,
  carId: string | null
}

interface FuncHandler {
  ChangeContainer: (container: MenuHandler, carId: string | null) => void
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

  
  const changeContainer: FuncHandler['ChangeContainer'] = (container: MenuHandler, id: string | null) => {
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
          <ContainerSelect user={user} status={status} container={containerHandler}/>
        </div>
      </div>
  )
}

type ContainerSelectProps = {
  container: ContainerInfo,
  user: UserProps,
  status: string
}

function ContainerSelect({container, user, status}: ContainerSelectProps) {
    
  if (container.menuType === "principal") {
    return (
      <Container>
      {status === "authenticated" && <h2 className="text-lg my-4 ml-4"> Welcome, <span className="text-primary">
      {user.name}! </span> You have currently 3 cars registered.
      </h2>}
        <div className="flex flex-col max-w-2xl p-2 w-full mx-auto">         
          <div className="carousel flex">
          <div id="item1" className="carousel-item w-full md:w-1/2">
            <CarCard color={"bg-red-300"}/>
          </div> 
          <div id="item1" className="carousel-item w-full md:w-1/2">
            <CarCard color={"bg-red-400"}/>
          </div> 
          <div id="item3" className="carousel-item w-full">
            <CarCard color={"bg-red-600"}/>
          </div> 
          <div id="item4" className="carousel-item w-full">
            <CarCard color={"bg-white"}/>
          </div>
        </div> 
        <div className="flex justify-center bg-neutral rounded-lg w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs bg-neutral text-white">1</a> 
          <a href="#item2" className="btn btn-xs bg-neutral text-white">2</a> 
          <a href="#item3" className="btn btn-xs bg-neutral text-white">3</a> 
          <a href="#item4" className="btn btn-xs bg-neutral text-white">4</a>
        </div>
      </div>
        <div className="flex flex-col xl:flex-row mx-auto lg:w-1/2 xl:w-full gap-4 xl:gap-0 mt-8 xl:mt-8">
          <InfoCard img='test' text='test1' textButton='test' linkTo="test"/>
          <InfoCard img='test' text='test1' textButton='test' linkTo="test"/>
          <InfoCard img='test' text='test1' textButton='test' linkTo="test"/>
          <InfoCard img='test' text='test1' textButton='test' linkTo="test"/>
        </div>
      {/* <Image src={Imaged} alt="t" width="100" height="100"/> */}
      </Container>
    )
  }
  else if (container.menuType === "add") {
    return (
      <Container>
      </Container>
    )
  }
  else if (container.menuType === "car") {
    return (
      <Container>
      <p> Car </p>
      <p> {container.carId} </p>
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