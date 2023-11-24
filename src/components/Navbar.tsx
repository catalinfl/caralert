import React, { useState } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { UserProps } from '@/app/main/page'
import Link from 'next/link'


interface NavbarProps {
  user: UserProps
}

const Navbar = ({user}: NavbarProps) => {

    // const [openMenu, setOpenMenu] = useState<boolean>(true)
    // const [openDropdown, setOpenDropdown] = useState<boolean>(true)
    
    // const openHandler = (open: OpenType) => {
    //     switch (open) {
    //         case "menu":
    //           if (!openMenu) {
    //             setOpenMenu(prev => !prev)
    //             setOpenDropdown(false)              
    //           }
    //           else setOpenMenu(false)
    //             break
    //         case "dropdown":
    //           if (!openDropdown) {
    //             setOpenDropdown(prev => !prev)
    //             setOpenMenu(false)
    //           }
    //           else setOpenDropdown(false)
              
    //             break
    //         case "none":
    //             setOpenMenu(false)
    //             setOpenDropdown(false)
    //             break
    //         default:
    //             break
    //     }
    // }
    
    // console.log(openMenu, openDropdown)
    
    

  return (
    <div className="navbar bg-base-10 justify-center bg-white border-[2px] border-primary max-w-sm xs:max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mt-2 rounded-lg mx-auto">
  <div className="flex">
    <Link href="/">
      <button className="btn btn-ghost ml-5 sm:ml-0 text-sm sm:text-xl">CarAlert</button>
    </Link>
  </div>
  <div className="flex-grow justify-end flex-row gap-0 md:gap-2">  
  <ul className="menu menu-horizontal xl:hidden flex rounded-sm bg-secondary text-white">
        <li>
            <details>
                <summary className="bg-secondary">
                    Cars
                </summary>
                <ul className="p-2 bg-base-100 rounded-sm text-black">
                    <li><a> Link 1 </a></li>
                </ul>
            </details>
        </li>
    </ul>
    <ul className="menu menu-horizontal px-1">
        <li>
            <details>
                <summary>
                    Parent
                </summary>
                <ul className="p-2 bg-base-100 rounded-sm">
                    <li><a> Link 1 </a></li>
                </ul>
            </details>
        </li>
    </ul>
    <div className="dropdown dropdown-end flex justify-center w-36 md:w-42">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image src={user.image} alt="avatar" width="40" height="40" /> 
        </div>
      </label>
      <ul tabIndex={0} className="mt-16 z-[1] p-2 menu menu-sm dropdown-content bg-base-100 rounded-box w-36 md:w-42">
        <li><a>{user.name}</a></li>
        <li onClick={() => signOut()}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default Navbar