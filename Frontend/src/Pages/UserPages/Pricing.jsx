import PricingSec1 from '@/components/UserComponents/PricingSec/PricingSec1'
import PricingSec2 from '@/components/UserComponents/PricingSec/PricingSec2'
import PricingSec3 from '@/components/UserComponents/PricingSec/PricingSec3'
import PricingSec4 from '@/components/UserComponents/PricingSec/PricingSec4'
import React from 'react'
import logo from "/ArtesterLogo2.png";
import Footer from '@/components/UserComponents/Footer'

const Pricing = () => {
  return (
    <div>
        <div>
            <PricingSec1/>
        </div>
        <div>
            <PricingSec2/>
        </div>
        <div>
            <PricingSec3/>
        </div>
        <div> 
            <PricingSec4/>
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

export default Pricing