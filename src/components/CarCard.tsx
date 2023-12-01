import React from 'react'
import Img from "../../public/car.svg"
import Image from 'next/image'
import { Car } from '@/app/add/page'

type CarCardProps = {
  carData: Car
}

const CarCard = ({ carData }: CarCardProps) => {
  return (
    <div className={`bg-neutral p-2 flex rounded-lg border-2 text-center justify-center items-center flex-col w-full h-[300px]`}>
        <div className='flex justify-center items-center w-full'>
          <Image src={Img} alt="car" width="150" height="120" />
        </div>
        <div className='text-white'>
          <p> Car: {carData.model} </p>
          <p> Carplate: {carData.carplate} </p>
          <p> First expire in: {carData.vignette} </p>
        </div>
    </div>
  )
}

export default CarCard