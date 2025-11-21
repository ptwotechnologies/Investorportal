import React from 'react'
import StartupSec1 from '../../components/UserComponents/StartupSec/StartupSec1'
import StartupSec2 from '../../components/UserComponents/StartupSec/StartupSec2'
import StartupSec3 from '../../components/UserComponents/StartupSec/StartupSec3'
import StartupSec4 from '../../components/UserComponents/StartupSec/StartupSec4'
import StartupSec5 from '../../components/UserComponents/StartupSec/StartupSec5'
import StartupSec6 from '../../components/UserComponents/StartupSec/StartupSec6'
import StartupSec7 from '../../components/UserComponents/StartupSec/StartupSec7'
import StartupSec8 from '../../components/UserComponents/StartupSec/StartupSec8'
import StartupSec9 from '../../components/UserComponents/StartupSec/StartupSec9'
import StartupSec10 from '../../components/UserComponents/StartupSec/StartupSec10'
import logo from "/ArtesterLogo2.png";

const Startup = () => {
  return (
    <div>
      <div>
        <StartupSec1/>
      </div>
      <div>
        <StartupSec2/>
      </div>
      <div>
        <StartupSec3/>
      </div>
      <div className='hidden lg:block'>
        <StartupSec4/>
      </div>
      <div>
        <StartupSec5/>
      </div>
      <div>
        <StartupSec6/>
      </div>
      <div>
        <StartupSec7/>
      </div>
      <div className='hidden lg:block'>
        <StartupSec8/>
      </div>
      <div>
        <StartupSec9/>
      </div>
      <div>
        <StartupSec10/>
      </div>
      <div>
                      <img src={logo} className='w-60 lg:w-90 mx-auto my-10 lg:my-0 lg:mb-20'/>
                    </div>
    </div>
  )
}

export default Startup
