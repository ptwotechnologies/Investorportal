import ContactUsSec1 from '@/components/UserComponents/ContactUsSec/ContactUsSec1'
import ContactUsSec2 from '@/components/UserComponents/ContactUsSec/ContactUsSec2'
import ContactUsSec3 from '@/components/UserComponents/ContactUsSec/ContactUsSec3'
import React from 'react'
import logo from "/ArtesterLogo2.png";
import Footer from '@/components/UserComponents/Footer';

const ContactUs = () => {
  return (
     <div>
     <div>
        <ContactUsSec1/>
     </div>
     <div>
        <ContactUsSec2/>
     </div>
     <div>
        <ContactUsSec3/>
     </div>
     <div>
        <Footer/>
      </div>
     <div>
                     <img src={logo} className='w-60 lg:w-90 mx-auto lg:my-25 my-15'/>
                   </div>
    </div>
  )
}

export default ContactUs
