"use client"
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import Coupe from '../../public/coupe.svg';
import Coupe2 from '../../public/coupe2.svg';
import Coupe3 from '../../public/coupe3.svg';
import Coupe4 from '../../public/coupe4.svg';
import Coupe5 from '../../public/coupe5.svg';
import Coupe6 from '../../public/coupe6.svg';
import Image from 'next/image';
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";



type Car = string;

type Cars = Car[];


function Home() {

  const session = useSession();
  
  useEffect(() => {
    if (session.status === "authenticated") {
      redirect("/main")
    }
  }, [session])
  
  const cars: Cars = [Coupe, Coupe2, Coupe3, Coupe4, Coupe5, Coupe6]
  const [car, setCar] = useState<Car>(Coupe)
  
  const setRandomColor = () => {
      const color = cars[Math.floor(Math.random() * cars.length)]
      setCar(prev => prev !== color ? color : cars[Math.floor(Math.random() * cars.length)])  
  }
  
  return (
        <div className="flex flex-col bg-gradient-to-tr from-purple-700 to-secondary rounded-lg min-h-[800px] p-5 mt-12 text-center md:text-start md:max-w-[1280px] w-full max-w-[400px] sm:max-w-[600px] mx-auto">
          <div className="flex h-[150px] sm:h-[200px]"> 
            <h1 className="text-4xl sm:text-6xl text-white font-bold">
              Foloseste pentru
              <span className="ml-2 sm:ml-4 bg-clip-text text-transparent bg-gradient-to-r from-base-200 to-primary">
              <Typewriter 
                words={['masina ta', 'a nu uita', 'RCA', 'ITP', 'Rovinieta']}
                typeSpeed={100}
                deleteSpeed={100}
                delaySpeed={1000}
                loop={true}
              />
              </span>
            </h1>
          </div>
          <div className="flex flex-col md:flex-row justify-center">
            <div className="flex flex-grow justify-center items-center">
              <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl"> Inscrie-te acum pentru a-ti salva informatiile despre <span className="font-bold text-secondary"> masina ta </span>  </h1>
            </div>
            <div className="image flex justify-center sm:justify-end mt-0 md:mt-12">
              <Image src={car} onClick={setRandomColor} className="cursor-pointer" width="700" height="500" alt="car"/>
            </div>        
          </div>
          <div className="flex flex-grow md:flex-row flex-col gap-4 w-full justify-center items-center">            
            <button className="btn btn-secondary md:ml-12 text-lg" onClick={() => {
            signIn("google")
            } 
            }> Logheaza-te folosind Google </button>
            <Link href="/about"> 
            <button className="btn btn-secondary md:ml-12 text-lg"> Vezi mai multe detalii </button>
            </Link>
          </div>
        </div>
  );
}

export default Home

