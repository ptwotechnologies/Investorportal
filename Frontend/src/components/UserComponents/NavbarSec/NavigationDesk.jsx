import React from 'react'
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import { Link } from "react-router-dom"
import img1 from "/joinuslogo1.png"
import img2 from "/joinuslogo2.png"
import img3 from "/joinuslogo3.png"
import img4 from "/joinuslogo4.png"
import { BsBoxArrowInUpRight } from "react-icons/bs";

import { useIsMobile } from "../../../hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


 
const NavigationDesk = () => {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile}  >
      <NavigationMenuList className="flex-wrap bg-[#001032] rounded-full px-1 py-1 inline-flex items-center gap-0 ">

        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-[#001032] text-white px-7 py-1 rounded-full text-lg  ">Auxiliaries</NavigationMenuTrigger>
          <NavigationMenuContent className="inner-shadow left-[-100px]">
            <ul className="grid w-[800px] h-80 gap-4 shadow-md border rounded-xl p-4">
              <li className='flex items-start justify-center gap-15 gap-y-20'>
                <NavigationMenuLink asChild >
                  <div className='w-[30%]'>
                    <Link to="/subscription" >
                    <div className="font-medium border border-[#D5D5D5] text-[#5C5C5C] rounded-full p-1 w-fit px-3 hover:bg-[#D5D5D5]">Subscriptions</div>
                  </Link>
                  <Link to="/subscription?tab=HR" >
                   <div className="text-[#001032] ml-3 font-medium mt-3 ">
                     HR
                    </div>
                  </Link>
                  <Link to="/subscription?tab=Legal">
                   <div className="text-[#001032] ml-3 font-medium">
                    Legal
                    </div>
                  </Link>
                  <Link to="/subscription?tab=Advisory">
                   <div className="text-[#001032] ml-3 font-medium">
                    Advisory
                    </div>
                  </Link>
                  <Link to="/subscription?tab=Marketing">
                   <div className="text-[#001032] ml-3 font-medium">
                    Marketing
                    </div>
                  </Link>
                   <Link to="/subscription?tab=Designing">
                   <div className="text-[#001032] ml-3 font-medium">
                    Designing
                    </div>
                  </Link>
                   <Link to="/subscription?tab=Consultancy">
                   <div className="text-[#001032] ml-3 font-medium">
                    Consultancy
                    </div>
                  </Link>
                   <Link to="/subscription?tab=Development">
                   <div className="text-[#001032] ml-3 font-medium">
                    Development
                    </div>
                  </Link>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <div  className='w-[30%]'>
                    <Link to="#">
                    <div className="font-medium border border-[#D5D5D5] text-[#5C5C5C] rounded-full p-1 w-fit px-4">Profile</div>
                  </Link>
                  <Link to="/startup">
                  <div className="text-[#001032] ml-3 font-medium mt-3">
                     Startup
                    </div>
                    <div className='text-xs text-[#000000] ml-3 w-[80%]'>
                        Register as a startups and create the profile
                    </div>
                  </Link>

                   <Link to="/investor">
                  <div className="text-[#001032] ml-3 font-medium mt-2">
                     Investors
                    </div>
                    <div className='text-xs text-[#000000] ml-3 w-[80%]'>
                        Showcase your profile to the startups
                    </div>
                  </Link>

                     <Link to="/serviceprofessional">
                  <div className="text-[#001032] ml-3 font-medium mt-2">
                     Service Profesionals
                    </div>
                    <div className='text-xs text-[#000000] ml-3 w-[80%]'>
                        Register as a service professional
                    </div>
                  </Link>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                 <div className='border border-[#D0D0D040] inner-shadow rounded-xl p-2  w-[30%]'>
                    <div className='border border-[#D0D0D040] shadow-md rounded-xl p-3 text-center'>
                     <h1 className='text-[#5C5C5C] font-medium'>Join us!</h1>
                     <p className='text-xs'>Join our ecosystem of 4 portals into one</p>
                     <div className='grid grid-cols-2 gap-x-5'>
                           <div>
                            <img src={img1} alt="" className='h-15' />
                           </div>
                           <div>
                            <img src={img2} alt="" className='h-15' />
                           </div>
                           <div>
                            <img src={img3} alt="" className='h-15' />
                           </div>
                           <div>
                            <img src={img4} alt="" className='h-15' />
                           </div>
                     </div>

                    <Link to="/joinus"> <button className='bg-[#001032] text-white p-1 px-5  rounded-full mb-2 mt-6'>Explore</button></Link>
                 </div>
                 </div>
                </NavigationMenuLink>
              </li>
              <div className='text-xs text-[#001032]  flex items-center gap-1 ml-3 relative bottom-10'>Explore the benefits of <Link to="/channelpartners" className='underline flex items-center gap-1'>channel partners  <BsBoxArrowInUpRight size={15} className='mt-1'/> </Link> </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} bg-transparent rounded-full`}>
            <Link to="/pricing" className="bg-[#001032] text-white px-11 py-1 rounded-full text-[19px]">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="bg-[#001032] text-white px-7 py-1 rounded-full text-lg">Resources</NavigationMenuTrigger>
           <NavigationMenuContent className="inner-shadow left-[-250px] ">
            <ul className="grid w-[500px] gap-4 shadow-md border rounded-xl p-4">
              <li className='flex items-start justify-center gap-5'>
                <NavigationMenuLink asChild>
                  <div>
                    <Link to="#">
                    <div className="font-medium border border-[#D5D5D5] text-[#5C5C5C] rounded-full p-1 w-fit px-4">Explore</div>
                  </Link>
                  <Link to="/about">
                  <div className="text-[#001032] ml-3 font-medium">
                    About Us
                    </div>
                    <div className='text-xs text-[#000000] ml-3 w-[80%]'>
                       Want to know about Artestor’s mission and vision 
                    </div>
                  </Link>

                   <Link to="/contactus">
                  <div className="text-[#001032] ml-3 font-medium mt-2">
                     Contact Us
                    </div>
                    <div className='text-xs text-[#000000] ml-3 w-[80%]'>
                       Contact the sales team for assistance
                    </div>
                  </Link>

                     <Link to="/channelpartners">
                  <div className="text-[#001032] ml-3 font-medium mt-2">
                    Channel Partners
                    </div>
                    <div className='text-xs text-[#000000] ml-3 w-[80%]'>
                        Register as a channel partner
                    </div>
                  </Link>
                  </div>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                 <div className='border border-[#D0D0D040] inner-shadow rounded-xl p-2'>
                    <div className='border border-[#D0D0D040] shadow-md rounded-xl p-3 text-center'>
                     <h1 className='text-[#5C5C5C] font-medium'>Join us!</h1>
                     <p className='text-xs'>Join our ecosystem of 4 portals into one</p>
                     <div className='grid grid-cols-2 gap-x-5 '>
                           <div>
                            <img src={img1} alt="" className='h-15' />
                           </div>
                           <div>
                            <img src={img2} alt="" className='h-15' />
                           </div>
                           <div>
                            <img src={img3} alt="" className='h-15' />
                           </div>
                           <div>
                            <img src={img4} alt="" className='h-15' />
                           </div>
                     </div>

                    <Link to="/joinus"> <button className='bg-[#001032] text-white p-1 px-5  rounded-full'>Explore</button></Link>
                 </div>
                 </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

       

        
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavigationDesk

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
