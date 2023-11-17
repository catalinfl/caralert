"use client"
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/Navbar';
import Menu from '@/components/Menu';
import Container from '@/components/Container';


export type UserProps = {
  name: string,
  email: string,
  image: string
}

export type ContainerHandler = {
  principal: boolean,
  add: boolean,
  expires: boolean,
  car: string | false
}


const Page = () => {
  
  const { data, status }  = useSession();
  
  const initContainer: ContainerHandler = {
    principal: true,
    add: false,
    expires: false,
    car: false
  }
    
  const initUser = {
    name: "",
    email: "",
    image: ""
  }
  
  const [containerHandler, setContainerHandler] = useState<ContainerHandler>(initContainer) 
  const [user, setUser] = useState<UserProps>(initUser)
  
    useEffect(() => {
      console.log(containerHandler)
    }, [containerHandler])
  
  const changeContainer = (container: keyof ContainerHandler, id: string | null) => {
    switch (container) {
      case "principal": {
        setContainerHandler(initContainer)
        break
      }
      case "add": {
        setContainerHandler(prev => ({...prev, principal: false, add: true}))
        break
      }
      case "expires": {
        setContainerHandler(prev => ({...prev, principal: false, expires: true}))
        break
      }
      case "car": {
        setContainerHandler(prev => ({...prev, principal: false, car: id as string}))
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
          <Container>
            <p> muie steaua </p>
          </Container>
        </div>
      </div>
  )
}

export default Page