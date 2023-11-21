import React from 'react'
import Image from 'next/image'
import Accident from "../../public/accident-icon.svg"
import { redirect } from 'next/navigation'
import { MenuHandler } from '@/app/main/page'


type InfoCardProps = {
    img: string,
    text: string,
    textButton: string,
    changeContainer: (container: MenuHandler, id: null | string) => void
    container: MenuHandler,
    id: string | null,
    hasLink: boolean
}


const InfoCard = ({img, text, textButton, changeContainer, container, id, hasLink}: InfoCardProps) => {
    
    const onClickFunc = () => {
        if (hasLink) {
            if (id !== null) {
                window.location.href = `/${container}/${id}`
            }
            else window.location.href = `/${container}`
        }
        changeContainer(container, id)
    }

  return (
    <div className="border border-primary rounded-lg xl:ml-2 p-4 h-[300px] flex flex-col w-full justify-center items-center hover:shadow-md transition-all hover:shadow-primary cursor-pointer">
        <div className="flex flex-1 ">
            <Image src={img} alt="car" width="100" height="100" />
        </div>
        <div className="flex flex-[2] flex-col justify-around items-center gap-y-4">
            <div className="mt-2 text-center">
                <p> {text} </p>
            </div>   
            <div className="">
                <button className="btn btn-primary" onClick={() => onClickFunc()}> {textButton} </button>
            </div>
        </div>
    </div>
  )
}

export default InfoCard