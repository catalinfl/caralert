import React from 'react'
import Img from "../../public/car.svg"
import Image from 'next/image'
import { Car } from '@/app/add/page'
import { MenuHandler } from '@/app/main/page'

type CarCardProps = {
  carData: Car
  changeContainer: (container: MenuHandler, carId: string | null) => void
}

const CarCard = ({ carData, changeContainer }: CarCardProps) => {
  return (
    <div className={`bg-neutral p-2 flex rounded-lg border-2 text-center justify-center items-center flex-col w-full h-[300px] cursor-pointer`} onClick={() => changeContainer("car", carData.id as string)}>
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