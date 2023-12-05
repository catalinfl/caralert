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
    console.log(id)
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
  


  return (
      <div className="flex w-full justify-center sm:grid sm:grid-cols-12 sm:gap-4">
        <div className="col-span-2 mt-16">
          <Menu changeContainer={changeContainer} carData={carData}/>
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
      <div className={ carData?.cars === undefined || carData?.cars.length === 0 ? `min-h-[700px] h-full flex flex-col justify-between` : "" }>
      {status === "authenticated" && <h2 className="text-lg my-4 ml-4"> Welcome, <span className="text-primary">
      {user.name}! </span> { carData?.cars !== undefined && carData?.cars.length !== 0 ? `You have currently ${carData?.cars?.length} cars registered.` : "You have no cars registered. Use Add a car button to add a new car." }
      </h2>}
 { carData?.cars.length !== 0 ? <div className="flex flex-col bg-primary rounded-lg max-w-xl p-2 w-full mx-auto">
      <div className="carousel flex">
        {carData?.cars?.map((car: Car, index) => {
          return (
            <div key={index} id={`card-${index}`} className="carousel-item w-full">
              <CarCard key={index} carData={car} />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col sm:flex-row justify-center bg-neutral rounded-lg w-full py-2 gap-2">
        {carData?.cars?.length as number > 0 && (
            carData?.cars.map((car: Car, index: number) => {
              const pageNumber = index + 1;
              const anchorId = `#card-${index}`;
              return (
                <a key={index} href={anchorId} className="btn btn-xs bg-neutral text-white">
                  {pageNumber}
                </a>
              );        
            }
            ))
        }
      </div>
</div> : null}
        <div className="flex flex-col xl:flex-row mx-auto lg:w-1/2 xl:w-full gap-2 xl:gap-4 mt-8 xl:mt-8 selection:bg-transparent">
          <InfoCard img={images[0]} text='Add a new car to your account' textButton='Add' hasLink={true} changeContainer={changeContainer} container='add' id={null} />
          <InfoCard img={images[1]} text='Add a reminder for a car' textButton='Set reminder' changeContainer={changeContainer} container='add' id={null} hasLink={false}/>
          <InfoCard img={images[2]} text='Edit a car' textButton='Edit' changeContainer={changeContainer} container='edit' id={null} hasLink={true}/>
          <InfoCard img={images[3]} text='See what expires next' textButton='See insurances' changeContainer={changeContainer} container='expires' id={null} hasLink={false}/>
        </div>
      {/* <Image src={Imaged} alt="t" width="100" height="100"/> */}
      </div>
      </Container>
    )
  }
  else if (container.menuType === "add") {
    redirect("/add")
  }
  else if (container.menuType === "car") {
  
    const filter = carData?.cars.filter((car: Car) => car.id === container.carId)
    const car: Car | null = filter ? filter[0] as Car : null
        
    const insuranceDate = new Date(new Date(car?.insurance as string).getTime() + 1000 * 60 * 60 * 2)
    const itpDate = new Date(new Date(car?.itp as string).getTime() + 1000 * 60 * 60 * 2)
    const vignetteDate = new Date(new Date(car?.vignette as string).getTime() + 1000 * 60 * 60 * 2)
    
    const insuranceRemaining = Math.floor((insuranceDate.getTime() - new Date().getTime() - 1000 * 60 * 60 * 24) / (1000 * 60 * 60 * 24))
    const itpRemaining = Math.floor((itpDate.getTime() - new Date().getTime() - 1000 * 60 * 60 * 24) / (1000 * 60 * 60 * 24))
    const vignetteRemaining = Math.floor((vignetteDate.getTime() - new Date().getTime() - 1000 * 60 * 60 * 24) / (1000 * 60 * 60 * 24))
    
    const year = new Date();
    year.setFullYear(year.getFullYear() - 1);
    console.log(new Date().getTime() - year.getTime());
    
    const insPercent = Math.floor(((new Date().getTime() - year.getTime()) / (new Date(car?.insurance as string).getTime() - year.getTime())) * 100);
    const itpPercent = Math.floor(((new Date().getTime() - year.getTime()) / (new Date(car?.itp as string).getTime() - year.getTime())) * 100);
    const vignettePercent = Math.floor(((new Date().getTime() - year.getTime()) / (new Date(car?.vignette as string).getTime() - year.getTime())) * 100);
 
    const deleteItem = async (id: string) => {
        const res = await fetch(`http://localhost:3000/api/car/${id}`, { method: "DELETE"})
        .then(() => window.location.href = "/main")
        .catch(err => console.log(err))
    }
    
    return (
      <Container>
      <div className="flex flex-col lg:flex-row justify-between min-h-[700px] h-full">
        <div className="flex gap-y-2 flex-col justify-start w-[80%] bg-primary mx-auto p-3 text-white font-semibold rounded-lg">
          <p> Car model:  <span className="font-light"> {car?.model} </span> </p>
          <p> Car plate: <span className="font-light"> {car?.carplate} </span> </p>
          <p> Car colour: <span className="font-light"> {car?.colour} </span> </p>
          <p> Car description: </p>
          <p className="font-light p-2 bg-neutral"> No description </p>
          <div className={`${insPercent >= 90 ? insPercent === 100 ? "bg-red-700" :  "bg-yellow-500" : "bg-neutral" } flex flex-col md:flex-row items-center gap-5 p-4`}>
            <div className="flex flex-1"> 
            <p> Insurance expires: <span className="font-light"> {car?.insurance} </span> </p>
            </div>
            <div className="flex flex-1 items-center gap-5">
            <progress className="progress progress-primary w-32 md:w-48 lg:w-56 h-3" value={insPercent} max="100"></progress> {`${insPercent}`}% - {insPercent < 100 ? `${insuranceRemaining} days left` : "Expired"}
            </div>
          </div>
          <div className={`${itpPercent >= 90 ? itpPercent === 100 ? "bg-red-700" :  "bg-yellow-500" : "bg-neutral" } flex flex-col md:flex-row items-center gap-5 p-4`}>
            <div className="flex flex-1"> 
            <p> ITP expires: <span className="font-light"> {car?.itp} </span> </p>
            </div>
            <div className="flex flex-1 items-center gap-5">
            <progress className="progress progress-primary w-32 md:w-48 lg:w-56 h-3" value={itpPercent} max="100"></progress> {`${itpPercent}`}% - {itpPercent < 100 ? `${itpRemaining} days left` : "Expired"}
            </div>
          </div>
          <div className={`${vignettePercent >= 90 ? vignettePercent === 100 ? "bg-red-700" :  "bg-yellow-500" : "bg-neutral" } flex flex-col md:flex-row items-center gap-5 p-4`}>
            <div className="flex flex-1"> 
            <p> Rovignette expires: <span className="font-light"> {car?.vignette} </span> </p>
            </div>
            <div className="flex flex-1 items-center gap-5">
            <progress className="progress progress-primary w-32 md:w-48 lg:w-56 h-3" value={vignettePercent} max="100"></progress> {`${vignettePercent}`}% - {vignettePercent < 100 ? `${vignetteRemaining} days left` : "Expired"}
            </div>
          </div>
          
          { /* Need reparation, also adding description in schema */
          /* <div className="flex flex-col md:flex-row items-center gap-5 bg-neutral p-4">
            <div className="flex flex-1"> 
            <p> Reparation expires: <span className="font-light"> {car?.} </span> </p>
            </div>
            <div className="flex flex-1 items-center gap-5">
            <progress className="progress progress-primary w-32 md:w-48 lg:w-56 h-3" value={40} max="100"></progress> 30% - 3 months left 
            </div>
          </div> */}
          
        </div>
        <div className="flex flex-col justify-start">
          {/* <div>
            <Image src={CarPark} className="mx-auto mb-4 p-2 rounded-lg" alt="inspection" width="250" height="400" />
          </div> */}
        <div className="flex flex-row w-full gap-5 max-w-[200px] justify-center mx-auto rounded-lg bg-primary my-3 p-2">
          <div className="flex flex-col cursor-pointer justify-center items-center text-white font-bold">
            <CiEdit className="text-7xl text-white border-2 border-white"/>
            <p> Edit/Add </p>
          </div>
          <div onClick={() => deleteItem(car?.id as string)} className="flex flex-col cursor-pointer justify-center items-center text-white font-bold">
            <MdDeleteOutline className="text-7xl text-white border-2 border-white"/>
            <p> Delete </p>
          </div>
        </div>
        </div>
        </div>
      </Container>
    )
  }
  else {
    console.log(carData)
  
    const expiredInsurances = carData?.cars.filter((car: Car, index, carsArray) => {
      const insuranceDate = new Date(car?.insurance as string);
      const insuranceRemaining = Math.floor((insuranceDate.getTime() - new Date().getTime() - 1000 * 60 * 60 * 24) / (1000 * 60 * 60 * 24));
      
      return insuranceRemaining < 0 && carsArray.findIndex((c) => c.carplate === car.carplate) === index;
    });
    
    const expiredItp = carData?.cars.filter((car: Car, index, carsArray) => {
      const itpDate = new Date(car?.itp as string);
      const itpRemaining = Math.floor((itpDate.getTime() - new Date().getTime() - 1000 * 60 * 60 * 24) / (1000 * 60 * 60 * 24));
      
      return itpRemaining < 0 && carsArray.findIndex((c) => c.carplate === car.carplate) === index; 
    })
    
    const expiredVignette = carData?.cars.filter((car: Car, index, carsArray) => {
      const vignetteDate = new Date(car?.vignette as string);
      const vignetteRemaining = Math.floor((vignetteDate.getTime() - new Date().getTime() - 1000 * 60 * 60 * 24) / (1000 * 60 * 60 * 24));
      
      return vignetteRemaining < 0 && carsArray.findIndex((c) => c.carplate === car.carplate) === index;
    })
    
    
    
  
    return (
      <Container>
        <div className="flex flex-col justify-center items-center gap-y-2">
          {carData?.cars.map((car: Car, index: number) => {
            
            var expiredInsBool = false, expiredItpBool = false, expiredVigBool = false;
            
            if (expiredInsurances?.some((c: Car) => c.carplate === car.carplate)) {
               expiredInsBool = true;
            }
            if (expiredItp?.some((c: Car) => c.carplate === car.carplate)) {
              expiredItpBool = true;
            }
            if (expiredVignette?.some((c: Car) => c.carplate === car.carplate)) {
              expiredVigBool = true;
            }
                        
            if (expiredInsBool || expiredItpBool || expiredVigBool) {
              return <Expire key={index} expireCar={car} expireInsurance={expiredInsBool} expireITP={expiredItpBool} expireVignette={expiredVigBool} />;
            }
          })
          }
        </div>
      </Container>
    )
  }
}

export default Page