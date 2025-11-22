import PricingSec1 from '@/components/UserComponents/PricingSec/PricingSec1'
import PricingSec2 from '@/components/UserComponents/PricingSec/PricingSec2'
import PricingSec3 from '@/components/UserComponents/PricingSec/PricingSec3'
import PricingSec4 from '@/components/UserComponents/PricingSec/PricingSec4'
import React from 'react'
import logo from "/ArtesterLogo2.png";

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
                        <img src={logo} className='w-60 lg:w-90 mx-auto mb-9 lg:mb-15'/>
                      </div>
    </div>
  )
}

export default Pricing