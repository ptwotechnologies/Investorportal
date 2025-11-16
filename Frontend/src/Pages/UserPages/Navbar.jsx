import React from 'react'
import { Link } from 'react-router-dom'
import logo from "/ArtesterLogo1.png"
import logo2 from "/ArtesterLogo2.png"
import NavbarDesk from '../../components/UserComponents/NavbarSec/NavbarDesk'
import NavbarSheet from '../../components/UserComponents/NavbarSec/NavbarSheet'

const Navbar = () => {
  return (
     <div className='w-full h-[15%] lg:h-[20%] flex justify-between items-center px-5 bg-[#001032] lg:bg-white fixed top-0 z-50'>
      <div>
        <Link to="/" ><img src={logo2} alt="Logo"   className='w-45 hidden lg:block ' /></Link>
        <Link to="/" ><img src={logo} alt="Logo"   className='w-45 lg:hidden  ' /></Link>    
      </div>
      

      <div className=" hidden lg:block"  >
        <NavbarDesk/>
      </div>
      
      <div>
       <NavbarSheet/>
      </div>
    </div>
  )
}

export default Navbar