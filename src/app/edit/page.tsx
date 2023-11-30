"use client"

import Navbar from '@/components/Navbar'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ContainerInfo, FuncHandler, MenuHandler, UserProps, initContainer } from '../main/page';
import { redirect } from 'next/navigation';
import Menu from '@/components/Menu';
import Container from '@/components/Container';

const EditPage = () => {
    
    const { data, status } = useSession();
    
    const [containerHandler, setContainerHandler] = useState<ContainerInfo>(initContainer)
    
    const changeContainer: FuncHandler['changeContainer'] = (container: MenuHandler, id: string | null) => {
        switch (container) {
          case "principal": {
            window.location.href="/main"
            break
          }
          case "add": {
            window.location.href="/add"
            break
          }
          case "expires": {
            window.location.href="/main"
            break
          }
          case "car": {
            window.location.href="/main"
            break
          }
        }
      }
    
    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/")
        }
    }, [])
    
  return (
    <div className="flex w-full justify-center sm:grid sm:grid-cols-12 sm:gap-4">  
        <div className="col-span-2 mt-16">
            <Menu changeContainer={changeContainer}/>
        </div>
        <div className="col-span-8">
            <Navbar user={data?.user as UserProps}/>
            <Container>
                <p> test </p> 
            </Container>
        </div>
    </div>
  )
}

export default EditPage