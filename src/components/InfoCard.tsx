import React from 'react'
import Image from 'next/image'
import Accident from "../../public/accident-icon.svg"


type InfoCardProps = {
    img: string,
    text: string,
    textButton: string,
    linkTo: string
}


const InfoCard = ({img, text, textButton}: InfoCardProps) => {
  return (
    <div className="border border-primary rounded-lg xl:ml-2 p-4 h-[300px] flex flex-col w-full justify-center items-center hover:shadow-md transition-all hover:shadow-primary">
        <div className="flex flex-1 ">
            <Image src={Accident} alt="car" width="100" height="100" />
        </div>
        <div className="flex flex-[2] flex-col justify-around items-center gap-y-4">
            <div className="mt-2 text-center">
                <p>Coace doamne prunele sa umplem cazanele sa curga </p>
            </div>   
            <div className="">
                <button className="btn btn-primary">Coace doamne prunele</button>
            </div>
        </div>
    </div>
  )
}

export default InfoCard