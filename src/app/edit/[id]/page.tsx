"use client"

import { useSession } from 'next-auth/react'
import React, { ChangeEvent, useEffect, useState } from 'react'

import { redirect } from 'next/navigation';
import Menu from '@/components/Menu';
import Container from '@/components/Container';
import { changeContainer } from '@/misc/changeContainer';

import { Car } from '@/app/add/page';
import Navbar from '@/components/Navbar';
import { UserProps } from '@/app/main/page';
// import { redirect } from 'next/dist/server/api-utils';

const EditPage = ({ params }: { params: { id: string }}) => {
    
    const { data, status } = useSession();

    const init = { id: "", carplate: "", model: "", description: "", itp: "", vignette: "", insurance: "", colour: ""}

    const [car, setCar] = useState<Car>(init)
    
    
    useEffect(() => {
    
        const fetchCar = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/car/${params.id}`, { method: "GET"})
                const data = await response.json()
                setCar(data.car)
            }
            catch(err) {
                console.log(err)
            }
        }    
        
        if (status === "unauthenticated") {
            redirect("/")
        }
        if (status === "authenticated") {
            fetchCar();
        }
        
    }, [status, params.id])
    
    
    const [modify, setModify] = useState<string>("");
    const [placeholderValue, setPlaceholderValue] = useState<string>(""); 
    const [edit, setEdit] = useState<Partial<Car>>(init)
    
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;
        setModify(e.target.value)
        if (selectedOption === "Model") {
            setPlaceholderValue(car.model);
        } else if (selectedOption === "Carplate") {
            setPlaceholderValue(car.carplate);
        } else if (selectedOption === "Colour") {
            setPlaceholderValue(car.colour);
        } else if (selectedOption === "Description") {
            setPlaceholderValue(car?.description || "");
        } else if (selectedOption === "Insurance") {
            setPlaceholderValue(car.insurance);
        } else if (selectedOption === "ITP") {
            setPlaceholderValue(car.itp);
        } else if (selectedOption === "Vignette") {
            setPlaceholderValue(car.vignette);
        }
    }
    
    const handleInput = (type: string, e: ChangeEvent<HTMLInputElement>) => {
        switch (type) {
            case "Carplate": {
                setEdit( {...edit, carplate: e.target.value })
                break
            }
            case "Model": {
                setEdit({ ...edit, model: e.target.value})
                break
            }
            case "Description": {
                setEdit({...edit, description: e.target.value})
                break
            }
            case "Insurance": {
                setEdit({...edit, insurance: e.target.value})
                break
            }
            case "Colour": {
                setEdit({...edit, colour: e.target.value})
                break
            }
            case "ITP": {
                setEdit({...edit, itp: e.target.value})
                break
            }
            case "Vignette": {
                setEdit({...edit, vignette: e.target.value})
                break
            }
        }
    }
    
   
   const nonEmptyValues = Object.fromEntries(Object.entries(edit).filter(([_, v]) => v !== ""))

   const handleEdit = async () => {
    try {
        const body = JSON.stringify({ name: data?.user?.name, carDetails: nonEmptyValues })
        const res = await fetch(`http://localhost:3000/api/car/${params.id}`, { method: "PUT", body: body})
        window.location.href = `/edit/${params.id}`
    }
    catch(err) {
        console.log(err)
    }
   }
    
  return (
    <div className="flex w-full justify-center sm:grid sm:grid-cols-12 sm:gap-4">  
        <div className="col-span-2 mt-16">
            <Menu changeContainer={changeContainer}/>
        </div>
        <div className="col-span-8">
            <Navbar user={data?.user as UserProps} />
            <Container>
                 <div className="flex flex-col justify-start gap-y-4 min-h-[700px] h-full">
                     <div className="flex gap-y-2 flex-col justify-start w-[80%] bg-primary mx-auto p-3 text-white font-semibold rounded-lg cursor-pointer">
                       <p> Car model:  <span        className="font-light"> {car.model} </span> </p>
                       <p> Car plate:  <span className="font-light"> {car.carplate} </span> </p>
                       <p> Car colour: <span className="font-light"> {car.colour} </span> </p>
                       <p> Car description: </p>
                       <p className="font-light p-2 bg-neutral"> {car.description || "No description"} </p>
                       <p> Insurance expires: <span className="font-light"> {car.insurance} </span> </p>
                       <p> ITP expires: <span className="font-light"> {car.itp} </span> </p>
                       <p> Vignette expires: <span className="font-light"> {car.vignette} </span> </p>
                     </div>
                     <p className="flex justify-center mt-4"> Modify: </p>
                     <div className="bg-primary flex flex-col font-bold p-4 justify-center items-center gap-4 text-primary max-w-xs md:max-w-4xl w-full mx-auto rounded-lg">
                     <select onChange={(e: ChangeEvent<HTMLSelectElement>) => handleSelectChange(e)} className="select select-primary bg-primary w-full mt-4 max-w-xs sm:max-w-sm" defaultValue={"Model"}>
                      <option disabled>
                        Select an option
                      </option>
                      <option> Model </option>
                      <option> Carplate </option>
                      <option> Colour </option>
                      <option> Description </option>
                      <option> Insurance </option>
                      <option> ITP </option>
                      <option> Vignette </option>
                    </select>
                    
                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => handleInput(modify, e)} className="flex input input-text max-w-lg xl w-full" placeholder={placeholderValue} />
                    
                    <div className="flex" onClick={() => {
                        
                    }}>
                        <button className="btn btn-neutral" onClick={handleEdit}> Edit </button>
                    </div>
                     </div>
                 </div>
            </Container>
        </div>
    </div>
  )
}

export default EditPage