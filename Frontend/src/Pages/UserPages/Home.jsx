import React from 'react'
import HomeSec1 from '../../components/UserComponents/HomeSec/HomeSec1'
import HomeSec2 from '../../components/UserComponents/HomeSec/HomeSec2'
import HomeSec3 from '../../components/UserComponents/HomeSec/HomeSec3'
import HomeSec4 from '../../components/UserComponents/HomeSec/HomeSec4'
import HomeSec5 from '../../components/UserComponents/HomeSec/HomeSec5'
import HomeSec6 from '../../components/UserComponents/HomeSec/HomeSec6'
import HomeSec7 from '../../components/UserComponents/HomeSec/HomeSec7'
import HomeSec8 from '../../components/UserComponents/HomeSec/HomeSec8'
import logo from "/ArtesterLogo2.png";
import Footer from '@/components/UserComponents/Footer'

const Home = () => {
  return (
     <div >
      <div  >
        <HomeSec1/>
      </div>
      <div >
        <HomeSec2/>
      </div>
      <div >
        <HomeSec3/>
      </div>
      <div>
        <HomeSec4/>
      </div>
      <div >
        <HomeSec5/>
      </div>
      <div >
        <HomeSec6/>
      </div>

      <div >
        <HomeSec7/>
      </div>

      <div>
        <HomeSec8/>
      </div>

      <div>
        <Footer/>
      </div>
       <div>
                <img src={logo} className='w-60 lg:w-90 mx-auto lg:my-25 my-15 '/>
              </div>
    </div>
  )
}

export default Home