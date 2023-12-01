"use client"
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import CarInspection from "../../../public/car-inspection-icon.svg"
import CarInsurance from "../../../public/car-insurance-icon.svg"
import AccidentIcon from "../../../public/accident-icon.svg"
// import CarIllustration from "../../../public/car-illustration.svg"
import CarPark from "../../../public/carpark.svg"

import CarRepair from "../../../public/car-repair.svg"
import Navbar from '@/components/Navbar';
import Menu from '@/components/Menu';
import Container from '@/components/Container';
import CarCard from '@/components/CarCard';
import InfoCard from '@/components/InfoCard';
import Expire from '@/components/Expire';
import { CiEdit } from 'react-icons/ci';
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import { Car } from '../add/page';

const images: string[] = [CarInspection, CarInsurance, CarRepair, AccidentIcon]


export type ContainerSelectProps = {
  container: ContainerInfo,
  user: UserProps,
  status: string
  changeContainer: (container: MenuHandler, carId: string | null) => void
  carData: null | { cars: Car[] & string }
}

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

export interface FuncHandler {
  changeContainer: (container: MenuHandler, carId: string | null) => void
}
  
export const initContainer: ContainerInfo = {
  menuType: "principal",
  carId: null
}  

const Page = () => {
  
  const { data, status }  = useSession();
      
  const initUser = {
    name: "",
    email: "",
    image: ""
  }
  
  const [containerHandler, setContainerHandler] = useState<ContainerInfo>(initContainer) 
  const [user, setUser] = useState<UserProps>(initUser)
  
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
  
  const [carData, setCarData] = useState<null | { cars: Car[] & string } >(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const nameForURL = encodeURIComponent(user.name)
        console.log(nameForURL)
        const res = await fetch(`http://localhost:3000/api/user/${nameForURL}`, { method: "GET" })
        if (res.ok) {
          const data = await res.json();
          setCarData(data)
          console.log(data)
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    if (status === "authenticated") {
      const user: UserProps = data.user as UserProps 
      setUser(user)
      fetchData();
    }
    
    if (status === "unauthenticated") {
      redirect("/")
    }
    
  }, [status, user, data])

  console.log(user)

  
  return (
      <div className="flex w-full justify-center sm:grid sm:grid-cols-12 sm:gap-4">
        <div className="col-span-2 mt-16">
          <Menu changeContainer={changeContainer}/>
        </div>
        <div className="col-span-8">
          <Navbar user={user} />
          <ContainerSelect changeContainer={changeContainer} user={user} status={status} container={containerHandler} carData={carData}/>
        </div>
      </div>
  )
}


function ContainerSelect({container, user, status, changeContainer, carData}: ContainerSelectProps) {
    
  if (container.menuType === "principal") {
    return (
      <Container>
      {status === "authenticated" && <h2 className="text-lg my-4 ml-4"> Welcome, <span className="text-primary">
      {user.name}! </span> You have currently {carData?.cars?.length} cars registered.
      </h2>}
      <div className="flex flex-col bg-primary rounded-lg max-w-2xl p-2 w-full mx-auto">
  <div className="carousel flex">
    {carData?.cars?.map((car: Car, index) => {   
      if (index === 0) {
        return (
          <div key={car._id} id="1" className="carousel-item w-1/2">
            <CarCard carData={car} />
          </div>
        );
      }
      if (index === carData.cars.length - 1) {
        return (
          <div key={car._id} id={(carData.cars.length).toString()} className="carousel-item w-1/2">
            <CarCard carData={car} />
          </div>
        );
        }
      if (carData.cars.length % 2 === 0) {
        if (index % 2 !== 0) {
          const indexGroup = Math.floor(index / 2) + 1;
          console.log(indexGroup)
          return (
            <div key={car._id} id={indexGroup.toString()} className="carousel-item w-1/2">
              <CarCard carData={car} />
            </div>
          );
        }      
      }
      if (carData.cars.length % 2 !== 0) {
        if (index % 2 === 0) {
          const indexGroup = Math.floor(index / 2) + 1;
          console.log(indexGroup)
          return (
            <div key={car._id} id={indexGroup.toString()} className="carousel-item w-1/2">
              <CarCard carData={car} />
            </div>
          );
        }
      }
      
        return (
          <div key={car._id} className="carousel-item w-1/2">
            <CarCard carData={car} />
          </div>
        )
    })}
  </div>
  <div className="flex justify-center bg-neutral rounded-lg w-full py-2 gap-2">
    {carData?.cars?.map((_, index) => {
      if (index % 2 === 0) {
        const groupIndex = Math.floor(index / 2) + 1;
        console.log(groupIndex)
        const anchorId = `#${groupIndex}`;

        return (
          <a key={index} href={anchorId} className="btn btn-xs bg-neutral text-white">
            {groupIndex}
          </a>
        );
      }
      return null;
    })}
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
        <div className="flex flex-col">
          <div>
            <Image src={CarPark} className="mx-auto mb-4 p-2 rounded-lg" alt="inspection" width="250" height="400" />
          </div>
        <div className="flex flex-row w-full gap-5 max-w-[200px] justify-center mx-auto rounded-lg bg-neutral my-3 p-2">
          <div className="flex flex-col cursor-pointer justify-center items-center text-white font-bold">
            <CiEdit className="text-7xl text-white border-2 border-white"/>
            <p> Edit </p>
          </div>
          <div className="flex flex-col cursor-pointer justify-center items-center text-white font-bold">
            <MdDeleteOutline className="text-7xl text-white border-2 border-white"/>
            <p> Delete </p>
          </div>
        </div>
        </div>
        <div className="flex gap-y-2 flex-col justify-start w-[80%] bg-primary mx-auto p-3 text-white font-semibold rounded-lg">
          <p> Car model:  <span className="font-light"> Opel Astra H </span> </p>
          <p> Car plate: <span className="font-light"> MH 33 BLM </span> </p>
          <p> Car colour: <span className="font-light"> Black </span> </p>
          <p> Car description: </p>
          <p className="font-light p-2 bg-neutral"> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, quam maxime itaque veniam fugit nobis nostrum exercitationem rem error incidunt minima sed beatae saepe atque repellat iusto animi nam doloribus nisi culpa! Voluptate commodi, esse nihil recusandae voluptatibus reiciendis similique itaque nam, natus modi ad fuga voluptates libero laboriosam iusto. </p>
          <div className="flex flex-col md:flex-row items-center gap-5 bg-neutral p-4">
            <div className="flex flex-1"> 
            <p> Insurance expires: <span className="font-light"> Black </span> </p>
            </div>
            <div className="flex flex-1 items-center gap-5">
            <progress className="progress progress-primary w-32 md:w-48 lg:w-56 h-3" value="70" max="100"></progress> 30% - 3 months left 
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5 bg-neutral p-4">
            <div className="flex flex-1"> 
            <p> ITP expires: <span className="font-light"> Black </span> </p>
            </div>
            <div className="flex flex-1 items-center gap-5">
            <progress className="progress progress-primary w-32 md:w-48 lg:w-56 h-3" value="70" max="100"></progress> 30% - 3 months left 
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5 bg-neutral p-4">
            <div className="flex flex-1"> 
            <p> Rovignette expires: <span className="font-light"> Black </span> </p>
            </div>
            <div className="flex flex-1 items-center gap-5">
            <progress className="progress progress-primary w-32 md:w-48 lg:w-56 h-3" value="70" max="100"></progress> 30% - 3 months left 
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5 bg-neutral p-4">
            <div className="flex flex-1"> 
            <p> Reparation expires: <span className="font-light"> Black </span> </p>
            </div>
            <div className="flex flex-1 items-center gap-5">
            <progress className="progress progress-primary w-32 md:w-48 lg:w-56 h-3" value={40} max="100"></progress> 30% - 3 months left 
            </div>
          </div>
        </div>
      </Container>
    )
  }
  else {
    return (
      <Container>
        <div className="flex flex-col justify-center items-center gap-y-2">
          <Expire />
          <Expire />
          <Expire />
          <Expire />          
        </div>
      </Container>
    )
  }
}

export default Page