import JoinUsSec1 from '@/components/UserComponents/JoinUsSec/JoinUsSec1'
import JoinUsSec2 from '@/components/UserComponents/JoinUsSec/JoinUsSec2'
import JoinUsSec3 from '@/components/UserComponents/JoinUsSec/JoinUsSec3'
import JoinUsSec4 from '@/components/UserComponents/JoinUsSec/JoinUsSec4'
import JoinUsSec5 from '@/components/UserComponents/JoinUsSec/JoinUsSec5'
import JoinUsSec6 from '@/components/UserComponents/JoinUsSec/JoinUsSec6'
import JoinUsSec7 from '@/components/UserComponents/JoinUsSec/JoinUsSec7'
import JoinUsSec8 from '@/components/UserComponents/JoinUsSec/JoinUsSec8'
import JoinUsSec9 from '@/components/UserComponents/JoinUsSec/JoinUsSec9'
import React from 'react'
import logo from "/ArtesterLogo2.png";

const JoinUs = () => {
  return (
    <div>
      <div>
        <JoinUsSec1/>
      </div>
      <div>
        <JoinUsSec2/>
      </div>
      <div>
        <JoinUsSec3/>
      </div>
      <div>
        <JoinUsSec4/>
      </div>
      <div>
        <JoinUsSec5/>
      </div>
      <div>
        <JoinUsSec6/>
      </div>
      <div className='hidden lg:block'>
        <JoinUsSec7/>
      </div>
      <div>
        <JoinUsSec8/>
      </div>
      <div>
        <JoinUsSec9/>
      </div>
      <div>
                <img src={logo} className='w-60 lg:w-90 mx-auto mb-10 lg:my-20'/>
              </div>
    </div>
  )
}

export default JoinUs
