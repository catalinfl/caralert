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


const Page = () => {
  
  const { data, status }  = useSession();
  
  const initUser = {
    name: "",
    email: "",
    image: ""
  }
  
  const [user, setUser] = useState<UserProps>(initUser)
  
  
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
    <> 
    <Navbar user={user} />
    <div className="flex flex-row">
      <Menu />
      <Container />
    </div>
    </>
  )
}

export default Page