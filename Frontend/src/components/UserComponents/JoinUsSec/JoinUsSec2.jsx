import React from 'react'


function Item({ label }) {
  return (
    <div className="flex flex-col items-center gap-2 gap-y-4">
      {/* decorative placeholder icon */}
      <div className="h-14 w-14 bg-[#E5E5E5]  border border-border" />
      <p className="text-center text-lg font-semibold text-[#001032]">Verified Client pipelines</p>
    </div>
  )
}

function Divider() {
  return (
    <div className="flex items-center justify-center ">
      <div className="h-35 border-l  border-[#00103233]"  />
    </div>
  )
}

function HRule() {
  return (
    <div className="justify-self-center w-35">
      <div className="h-px w-full border-t  border-[#00103233]"  />
    </div>
  )
}

const JoinUsSec2 = () => {
  const label = ""

  return (
   <>
    <div className="mt-15  hidden  lg:block">
      
      <div className=" m-16">
        <div className="flex justify-evenly items-center gap-20">
          <div className="flex justify-center items-center gap-7">
            <div className="w-[18%]  ">
              <div className="w-15 h-15 bg-[#E5E5E5]  mb-5 mx-auto"></div>
              <p className="text-[#001032] font-medium text-center tracking-wide leading-8 text-xl">Verified Client <br/> ipelines</p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
            </div>
            <div className="w-[18%]  ">
              <div className="w-15 h-15 bg-[#E5E5E5]  mb-5 mx-auto"></div>
              <p className="text-[#001032] font-medium text-center tracking-wide leading-8 text-xl">Admin-Controlled
         Payments</p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
            </div>
             <div className="w-[18%]  ">
              <div className="w-15 h-15 bg-[#E5E5E5]  mb-5 mx-auto"></div>
              <p className="text-[#001032] font-medium text-center tracking-wide leading-8 text-xl">Post-Sales <br/>
   Support</p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
            </div>
             <div className="w-[18%]  ">
              <div className="w-15 h-15 bg-[#E5E5E5]  mb-5 mx-auto"></div>
              <p className="text-[#001032] font-medium text-center tracking-wide leading-8 text-xl">Automated Client
        Matching</p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
            </div>
            <div className="w-[18%]  ">
              <div className="w-15 h-15 bg-[#E5E5E5]  mb-5 mx-auto"></div>
              <p className="text-[#001032] font-medium text-center tracking-wide leading-8 text-xl">Industry Experts
       Guidance</p>
            </div>
            <div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>

    <div id="phoneScreen" className="   lg:hidden">
      <section className="w-full bg-background ">
      <div className="mx-auto  px-4 py-8 ">
        <div className='grid grid-cols-3 gap-y-10 '>
          <Item />
          <Divider/>
          <Item/>
          <HRule/>
         <div/>
         <HRule/>
         <Item/>
         <Divider/>
          <Item/>
          <div className="col-start-2">
            <Item  />
          </div>
        </div>
        <hr className="mt-15 border-t  border-[#00103233]" aria-hidden="true" /> 
      </div>
    </section>
    </div>
   </>
  )
}

export default JoinUsSec2
