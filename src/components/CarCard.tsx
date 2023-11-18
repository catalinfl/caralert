import React from 'react'

const CarCard = ({color}: {color: string}) => {
  return (
    <div className={`${color} p-2 flex w-full h-[200px]`}>
       <p> test </p> 
    </div>
  )
}

export default CarCard