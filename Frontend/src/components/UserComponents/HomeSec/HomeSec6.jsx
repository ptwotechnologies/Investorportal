import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from 'react-router-dom';

const HomeSec6 = () => {
  return (
     <div className=''>

        <div id='top' className='text-center lg:p-5 lg:pt-10 text-[#001032] lg:bg-[#F9972A1A] lg:mt-10 mt-6'>
           <div className='hidden lg:block'>
             <h1 className='text-3xl lg:text-5xl font-semibold p-3 lg:p-5 lg:pb-10 '>Great! <br/>
               How do I get started then?</h1>
               <p className='text-sm lg:text-lg w-[350px] mx-auto '>Simple, just choose which profile fits you, and we’ll show you what to do next.</p>
           </div>

           <div className='lg:hidden font-medium text-[#001032]'>
             <h1 className='text-3xl lg:text-5xl font-semibold p-3 lg:p-5 lg:pb-10 '>Awesome! <br/>
               How do I start building?</h1>
               <p className='text-sm lg:text-lg w-[320px] mx-auto pt-3 '>Easy — pick your profile and Artestor will guide your next step.</p>
           </div>
        </div>

        <div className='hidden lg:block'>
            <div id='bottom' className='lg:bg-[#F9972A1A] grid  grid-cols-3 gap-10 w-full gap-x-6 p-20 py-12 text-white '>
            <div className='bg-[#001032] rounded-sm p-6 w-full'>
                <div className='flex justify-start items-center py-4 gap-4 '>
                    <div className='bg-[#FFFFFF] w-22 h-22'></div>
                    <h1 className='text-2xl font-semibold'>Startup</h1>
                </div>
                <h1 className='text-lg leading-6 tracking-wide py-4 font-light'>Pick your onboarding plan</h1>
                <p className='text-lg leading-6 tracking-wide font-light '>Learn how to use your founder credit and start building with expert guidance</p>
                <div className='flex justify-end items-center gap-3'>
                    <Link to="/startup" className='mt-5'><button className='text-2xl font-semibold mb-2 mt-5'>Startups</button></Link>
                    <IoIosArrowRoundForward size={25} className='mt-10'/>
                </div>

            </div>
            <div className='bg-[#616B80] rounded-sm p-6'>
                <div className='flex justify-start items-center py-4 gap-4 '>
                    <div className='bg-[#FFFFFF] w-22 h-22'></div>
                    <h1 className='text-2xl font-semibold'>Investor</h1>
                </div>
                <h1 className='text-lg leading-6 tracking-wide py-4 font-light'>Create your investor account</h1>
                <p className='text-lg leading-6 tracking-wide  font-light'>Share your focus areas, deal sizes, and investment interests.</p>
                <div className='flex justify-end items-center gap-3'>
                    <Link to="/investor" className='mt-5'><button className='text-2xl font-semibold mb-2 mt-5 bg-white text-[#000000] p-2 px-3 rounded-sm'> Get Started</button></Link>
                </div>


            </div>
            <div className='bg-[#002A30CC] rounded-sm p-6'>
                <div className='flex justify-start items-center py-4 gap-4 '>
                    <div className='bg-[#FFFFFF] w-22 h-22'></div>
                    <h1 className='text-2xl font-semibold'>Service Professionals</h1>
                </div>
                <h1 className='text-lg leading-6 tracking-wide py-4 font-light'>Choose your onboarding plan</h1>
                <p className='text-lg leading-6 tracking-wide font-light'>Connect with verified startups and convert leads directly.</p>
                <div className='flex justify-end items-center gap-3'>
                   <Link to="/serviceprofessional" className='mt-5'> <button className='text-2xl font-semibold mb-2 mt-5'>Service Professionals</button></Link>
                    <IoIosArrowRoundForward size={25} className='mt-10'/>
                </div>


            </div>
   

        </div>
        </div>

        <div className='lg:hidden'>
             <div id='bottom' className=' grid grid-cols-1 gap-6 w-full  p-4 py-12 text-white '>
            <div className='bg-[#001032CC] rounded-sm p-3 px-4 w-full'>
                    <h1 className='text-xl font-semibold'>I’m a Startup</h1>
                <h1 className='text-sm leading-6 tracking-wide py-2  pt-4 '>Pick your onboarding plan</h1>
                <p className='text-sm leading-6 tracking-wider w-full '>Learn how to use your founder credits and start building with expert guidance.</p>
                 <Link to="/startup"><button className='text-md mb-2 mt-10 bg-white text-[#000000] p-2 px-6 rounded-sm'> Get Started</button></Link>
            </div>

             <div className='bg-[#616B80] rounded-sm p-3 px-4 w-full'>
                    <h1 className='text-xl font-semibold'>Investors</h1>
                <h1 className='text-sm leading-6 tracking-wide py-2  pt-4 '>Create your investor account.</h1>
                <p className='text-sm leading-6 tracking-wider w-full '>Share your focus areas, deal sizes, and investment interests.</p>
                 <Link to="/investor"><button className='text-md mb-2 mt-10 bg-white text-[#000000] p-2 px-6 rounded-sm'> Get Started</button></Link>
            </div>
             <div className='bg-[#002A30CC] rounded-sm p-3 px-4 w-full'>
                    <h1 className='text-xl font-semibold'>Service Professionals</h1>
                <h1 className='text-sm leading-6 tracking-wide py-2  pt-4 '>Choose your onboarding plan</h1>
                <p className='text-sm leading-6 tracking-wider w-full '>Connect with verified startups and convert leads directly.</p>
                 <Link to="/serviceprofessional"><button className='text-md mb-2 mt-10 bg-white text-[#000000] p-2 px-6 rounded-sm'> Get Started</button></Link>
            </div>

        </div>
        </div>
      
    </div>
  )
}

export default HomeSec6