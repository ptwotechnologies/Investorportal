import InvestorSec1 from '@/components/UserComponents/InvestorSec/InvestorSec1'
import InvestorSec10 from '@/components/UserComponents/InvestorSec/InvestorSec10'
import InvestorSec2 from '@/components/UserComponents/InvestorSec/InvestorSec2'
import InvestorSec3 from '@/components/UserComponents/InvestorSec/InvestorSec3'
import InvestorSec4 from '@/components/UserComponents/InvestorSec/InvestorSec4'
import InvestorSec5 from '@/components/UserComponents/InvestorSec/InvestorSec5'
import InvestorSec6 from '@/components/UserComponents/InvestorSec/InvestorSec6'
import InvestorSec7 from '@/components/UserComponents/InvestorSec/InvestorSec7'
import InvestorSec8 from '@/components/UserComponents/InvestorSec/InvestorSec8'
import InvestorSec9 from '@/components/UserComponents/InvestorSec/InvestorSec9'
import React from 'react'
import logo from "/ArtesterLogo2.png";
import Footer from '@/components/UserComponents/Footer'

const Investor = () => {
  return (
    <div>
      <div>
        <InvestorSec1/>
      </div>
      <div>
        <InvestorSec2/>
      </div>
      <div>
        <InvestorSec3/>
      </div>
      <div className='hidden lg:block'>
        <InvestorSec4/>
      </div>
      <div>
        <InvestorSec5/>
      </div>
      <div>
        <InvestorSec6/>
      </div>
      <div>
        <InvestorSec7/>
      </div>
      <div className='hidden lg:block'>
        <InvestorSec8/>
      </div>
      {/* <div>
        <InvestorSec9/>
      </div> */}
      <div>
        <InvestorSec10/>
      </div>
      <div>
        <Footer/>
      </div>
      <div>
                          <img src={logo} className='w-60 lg:w-90 mx-auto lg:my-25 my-15'/>
                          </div>
                          <div className="fixed bottom-0 left-0 w-full h-20
        bg-linear-to-t from-[#edbeed] to-transparent 
        pointer-events-none z-10" />
    </div>
  )
}

export default Investor
