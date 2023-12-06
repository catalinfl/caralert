import { Car } from '@/app/add/page';
import { MenuHandler } from '@/app/main/page';
import React from 'react'
import { FaCar } from "react-icons/fa"
import { FaCarOn, FaCarBurst } from "react-icons/fa6"
import { MdCarRental } from "react-icons/md";

type MenuProps = {
  changeContainer: (container: MenuHandler, id: null | string) => void
  carData?: { cars: Car[] & string } | null
}

const Menu = ({changeContainer, carData}: MenuProps) => {
  
  return (
      <ul className="menu bg-white xl:flex hidden p-0 lg:p-3 flex-col flex-grow max-w-[250px] w-full rounded-lg ml-0 2xl:ml-4 mt-[1.5rem]">
          <li>
            <h2 className="menu-title text-lg text-primary">Menu</h2>
            <ul className="border-l-2 border-primary">
            <li onClick={() => changeContainer("principal", null)}>
              <p className="flex flex-row justify-between"> <span> Summary </span> <span> <FaCar className="text-lg"/> </span> </p>
            </li>
            <li onClick={() => changeContainer("add", null)}>
              <p className="flex flex-row justify-between"> <span> Add a car </span> <span> <FaCarOn className="text-lg"/> </span> </p>
            </li>
            <li onClick={() => carData === undefined ? window.location.href = "/main"  : null}>
            {carData !== undefined ? <details open>
              <summary className="pr-6"> Cars </summary>
              <ul>
                {carData?.cars.map((car, index) => {
                  return(
                    <li key={index} onClick={() => changeContainer("car", car.id as string)}>
                      <p className="flex flex-row justify-between pr-[0.8rem]"> <span> {car.carplate} </span> <span> <MdCarRental className="text-2xl"/> </span> </p>
                    </li>
                  )
                })}
              </ul>
              </details> : 
              <p> Cars </p>
              }
              </li>
              <li onClick={() => changeContainer("expires", null)}>
              <p className="flex flex-row justify-between"> <span> See what expires next </span> <span> <FaCarBurst className="text-xl"/> </span> </p>
            </li>
            </ul>
          </li>
        </ul>
  )
}

export default Menu