import React , { useState, useRef } from 'react'

const ServiceProfessionalSec6 = () => {
  const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
  
    const handleScroll = () => {
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;
      const scrollLeft = scrollRef.current.scrollLeft;
      const index = Math.round(scrollLeft / clientWidth);
      setActiveIndex(index);
    };
  
    const divElements = [
      {
          paragraph:"Early-career freelancers who want predictable projects, quick payments, and vetted startup clients",
         company:"Freelancers",
         phonepara:"Professionals who deliver clarity, strategy, design, tech or support that early-stage founders need",
         phonecompany:"Consultants & Creators"
        
      },
      {
          paragraph:"Boutique agencies seeking founders with stage-fit budgets, repeatable scopes, and clear expectations",
         company:"Agencies",
         phonepara:"Experts who help founders scale through execution, mentoring and hands-on problem solving",
         phonecompany:"Operators & Builders"
        
      },
      {
          paragraph:"Specialist consultants who deliver high-impact outcomes — legal, finance, growth, product and design experts",
         company:"Specialists",
         phonepara:"Experts who help founders scale through execution, mentoring and hands-on problem solving",
         phonecompany:"Operators & Builders"
        
      },
         {
          paragraph:"Platform partners tools and services that complement founder’s needs, integrations and partnerships welcome",
         company:"Partners",
         phonepara:"Experts who help founders scale through execution, mentoring and hands-on problem solving",
         phonecompany:"Operators & Builders"
        
      },
  
    ]
    return (
      <div className='lg:mt-8 lg:px-10 mt-16 px-3' >
        <h1 className='text-2xl lg:text-5xl text-[#001032] font-bold text-center lg:text-start'>Who is this platform for?</h1>
       <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-scroll snap-x snap-mandatory scrollbar-hide lg:px-10 pt-8 gap-2 lg:gap-5 text-[#001032] ">
          {divElements.map((item, index) => (
            <div key={index} className="w-[48%]  lg:w-[30%] h-fit  shrink-0 snap-center lg:p-4  lg:mx-2  shadow-2xl lg:shadow-none ">
             <div className=' w-full h-full lg:gap-10  border border-[#00103280] 
             lg:rounded-2xl shadow-lg lg:p-3 p-2 '>
                <p className='text-sm lg:text-xl leading-6 tracking-wider hidden lg:block'>{item.paragraph}</p>
                <p className='text-sm lg:text-xl leading-6 tracking-wider lg:hidden'>{item.phonepara}</p>
              <div className=' flex justify-between items-center lg:mt-25 mt-5' >
                     <div className='font-semibold lg:text-xl hidden lg:block'>
                        <h1>{item.company}</h1>
                     </div>
                     <div className='font-medium text-sm  lg:hidden mr-1'>
                        <h1>{item.phonecompany}</h1>
                     </div>
                  <div className='flex justify-center items-center gap-3'>
                    <div className='w-0.5 h-10 bg-[#D9D9D9] '>
                  </div>
                    <div className='w-[50px] h-[50px]  rounded-full lg:bg-[#001032] bg-[#00000033]'>
                  </div>
                  
                  </div>
             </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2">
          {divElements.map((item, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                activeIndex === index ? 'bg-gray-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
         <div className='lg:text-center mt-10 '>
            <h1 className=' lg:bg-linear-to-r from-[#001032] lg:from-70% via-blue-[#001426] at-130% to-[#D8D8D8] 
            lg:text-white p-2 lg:px-10 w-fit lg:mx-auto rounded-3xl lg:text-sm text-lg hidden lg:block'>
                If you want a quieter pipeline of genuine leads and fewer low-value calls, Artestor removes the noise and brings you quality</h1>
                <h1 className=' lg:bg-linear-to-r from-[#001032] lg:from-70% via-blue-[#001426] at-130% to-[#D8D8D8] 
            lg:text-white p-2 lg:px-10 w-fit lg:mx-auto rounded-3xl lg:text-sm text-lg lg:hidden'>
                If your work supports founders atany stage — from idea to scale —this ecosystem is built for you
</h1>
                <p className='text-[#001032] mt-3 font-medium p-2 lg:text-md text-lg pb-15 lg:pb-0 hidden lg:block' >And if you’ve worked with startups before? That’s even better!</p>
                <p className='text-[#001032] mt-3 font-medium p-2 lg:text-md text-lg  pb-6 lg:hidden' >And if you’ve already worked withstartups before, that experiencemakes you even more valuable here</p>
         </div>
         <hr className='lg:hidden bg-[#00000033] '/>
      </div>
    )
}

export default ServiceProfessionalSec6
