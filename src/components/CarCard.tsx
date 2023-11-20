import React from 'react'
import Img from "../../public/car.svg"
import Image from 'next/image'

const CarCard = () => {
  return (
    <div className={`bg-neutral p-2 flex rounded-lg border-2 text-center justify-center items-center flex-col w-full h-[300px]`}>
        <div className='flex justify-center items-center w-full'>
          <Image src={Img} alt="car" width="150" height="120" />
        </div>
        <div className='text-white'>
          <p> Car: Opel Astra H </p>
          <p> Age: 2002 </p>
          <p> Carplate: MH 35 BLM </p>
          <p> Expires: 3 days </p>
        </div>
    </div>
  )
}

export default CarCard