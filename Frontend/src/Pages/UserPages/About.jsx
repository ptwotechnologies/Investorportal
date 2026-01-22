import React from 'react'
import AboutSec1 from '../../components/UserComponents/AboutSec/AboutSec1'
import AboutSec2 from '../../components/UserComponents/AboutSec/AboutSec2'
import AboutSec3 from '../../components/UserComponents/AboutSec/AboutSec3'
import AboutSec4 from '../../components/UserComponents/AboutSec/AboutSec4'
import AboutSec5 from '../../components/UserComponents/AboutSec/AboutSec5'
import AboutSec6 from '../../components/UserComponents/AboutSec/AboutSec6'
import logo from "/ArtesterLogo2.png";
import Footer from '@/components/UserComponents/Footer'

const About = () => {
  return (
    <div>
      <div >
     <AboutSec1/>
    </div>
    <div >
      <AboutSec2/>
    </div>
    <div >
      <AboutSec3/>
    </div>
    <div  >
      <AboutSec4/>
    </div>
    <div > 
      <AboutSec5/>
    </div>
    <div>
      <AboutSec6/>
    </div>

    <div>
        <Footer/>
      </div>
     <div>
          <img src={logo} className='w-60 lg:w-90 mx-auto   lg:my-25 my-15'/>
        </div>
    </div>
  )
}

export default About