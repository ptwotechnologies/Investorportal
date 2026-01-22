// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import logoDark from '/ArtesterLogo2.png';
// import logoLight from '/ArtesterLogo1.png';
// import NavbarSheet from '../../components/UserComponents/NavbarSec/NavbarSheet';
// import NavigationDesk from '@/components/UserComponents/NavbarSec/NavigationDesk';

// const Navbar = () => {
//   const location = useLocation();

  
//   let bgDesktop = 'bg-white';
//   let bgMobile = 'bg-[#001032]';
//   let textDesktop = 'text-[#001032]';
//   let textMobile = 'text-white';
//   let logoDesktop = logoDark;
//   let logoMobile = logoLight;

  
//   if (location.pathname === '/') {
//   bgDesktop = 'bg-white';
//   bgMobile = 'bg-[#001032]';
//   textDesktop = 'text-[#001032]';
//   textMobile = 'text-white';
//   logoDesktop = logoDark;
//   logoMobile = logoLight;

// } else if (
//   ['/about', '/pricing', '/channelpartners', '/subscription'].includes(location.pathname)
// ) {
//   bgDesktop = 'bg-white';
//   bgMobile = 'bg-white';
//   textDesktop = 'text-[#001032]';
//   textMobile = 'text-[#001032]';
//   logoDesktop = logoDark;
//   logoMobile = logoDark;
// }
  

//   return (
//     <div className={`w-full h-[12%] lg:h-[15%] flex justify-between items-center px-6 fixed top-0 z-50 ${bgMobile} lg:${bgDesktop}`}>
      
//       {/* Logo */}
//       <div>
//         <Link to="/">
//           <img src={logoDesktop} alt="Logo" className='w-45 hidden lg:block' />
//         </Link>
//         <Link to="/">
//           <img src={logoMobile} alt="Logo" className='w-35 lg:hidden' />
//         </Link>
//       </div>

//       {/* Desktop Nav */}
//       <div className={`hidden lg:flex items-center gap-5 ${textDesktop}`}>
//         <NavigationDesk textColor={textDesktop}/>
//       </div>

//       {/* Mobile Nav */}
//       <div className={textMobile}>
//         <NavbarSheet textColor={textMobile}/>
//       </div>
//     </div>
//   );
// }

// export default Navbar;




import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoDark from '/ArtesterLogo2.png';
import logoLight from '/ArtesterLogo1.png';
import NavbarSheet from '../../components/UserComponents/NavbarSec/NavbarSheet';
import NavigationDesk from '@/components/UserComponents/NavbarSec/NavigationDesk';

const Navbar = () => {
  const location = useLocation();

  // Scroll hide/show states
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false); // scrolling down → hide navbar
      } else {
        setShowNavbar(true); // scrolling up → show navbar
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // ---------- Dynamic Navbar Theme ------------
  let bgDesktop = 'bg-white';
  let bgMobile = 'bg-[#001032]';
  let textDesktop = 'text-[#001032]';
  let textMobile = 'text-white';
  let logoDesktop = logoDark;
  let logoMobile = logoLight;

  if (location.pathname === '/') {
    bgDesktop = 'bg-white';
    bgMobile = 'bg-[#001032]';
    textDesktop = 'text-[#001032]';
    textMobile = 'text-white';
    logoDesktop = logoDark;
    logoMobile = logoLight;
  } else if (
    ['/about', '/pricing', '/channelpartners', '/subscription'].includes(location.pathname)
  ) {
    bgDesktop = 'bg-white';
    bgMobile = 'bg-white';
    textDesktop = 'text-[#001032]';
    textMobile = 'text-[#001032]';
    logoDesktop = logoDark;
    logoMobile = logoDark;
  }

  // ---------- RETURN UI ----------
  return (
    <div
      className={`
        w-full h-[10%] lg:h-[15%] flex justify-between items-center px-4 lg:px-6 
        fixed top-0 z-50 transition-transform duration-300
        ${showNavbar ? 'translate-y-0' : '-translate-y-full'}
        ${bgMobile} lg:${bgDesktop}
      `}
    >
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={logoDesktop} alt="Logo" className="w-45 hidden lg:block" />
        </Link>
        <Link to="/">
          <img src={logoMobile} alt="Logo" className="w-35 lg:hidden" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className={`hidden lg:flex items-center gap-5 ${textDesktop}`}>
        <NavigationDesk textColor={textDesktop} />
      </div>

      {/* Mobile Navigation */}
      <div className={textMobile}>
        <NavbarSheet textColor={textMobile} />
      </div>
    </div>
  );
};

export default Navbar;

