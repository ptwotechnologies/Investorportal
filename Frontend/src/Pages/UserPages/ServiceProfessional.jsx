import React from 'react'
import ServiceProfessionalSec1 from './../../components/UserComponents/ServiceProfessionalSec/ServiceProfessionalSec1';
import ServiceProfessionalSec2 from './../../components/UserComponents/ServiceProfessionalSec/ServiceProfessionalSec2';
import ServiceProfessionalSec3 from './../../components/UserComponents/ServiceProfessionalSec/ServiceProfessionalSec3';
import ServiceProfessionalSec4 from './../../components/UserComponents/ServiceProfessionalSec/ServiceProfessionalSec4';
import ServiceProfessionalSec5 from '../../components/UserComponents/ServiceProfessionalSec/ServiceProfessionalSec5';
import ServiceProfessionalSec6 from '../../components/UserComponents/ServiceProfessionalSec/ServiceProfessionalSec6';
import ServiceProfessionalSec7 from '../../components/UserComponents/ServiceProfessionalSec/ServiceProfessionalSec7';
import ServiceProfessionalSec8 from '../../components/UserComponents/ServiceProfessionalSec/ServiceProfessionalSec8';
import ServiceProfessionalSec10 from '../../components/UserComponents/ServiceProfessionalSec/ServiceProfessionalSec10';
import ServiceProfessionalSec9 from '../../components/UserComponents/ServiceProfessionalSec/ServiceProfessionalSec9';
import logo from "/ArtesterLogo2.png";

const ServiceProfessional = () => {
  return (
    <div>
      <div>
        <ServiceProfessionalSec1/>
      </div>
      <div >
        <ServiceProfessionalSec2 />
      </div>
      <div>
        <ServiceProfessionalSec3/>
      </div>
      <div className='hidden lg:block'>
        <ServiceProfessionalSec4/>
      </div>
      <div>
        <ServiceProfessionalSec5/>
      </div>
      <div >
        <ServiceProfessionalSec6/>
      </div>
      <div >
        <ServiceProfessionalSec7/>
      </div>
      <div className='hidden lg:block'>
        <ServiceProfessionalSec8/>
      </div>
       <div >
        <ServiceProfessionalSec9/>
      </div>
      <div >
        <ServiceProfessionalSec10/>
      </div>
      <div>
                <img src={logo} className='w-60 lg:w-90 mx-auto mb-10 lg:mb-20'/>
              </div>
     
    </div>
  )
}

export default ServiceProfessional