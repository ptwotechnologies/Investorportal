
import SubscriptionSec1 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec1'
import SubscriptionSec2 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec2'
import SubscriptionSec3 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec3'
import SubscriptionSec3Desktop from '@/components/UserComponents/SubscriptionSec/SubscriptionSec3Desktop'
import { useSearchParams } from 'react-router-dom';

import SubscriptionSec4 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec4'
import SubscriptionSec5 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec5'

import SubscriptionSec6 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec6'
import logo from "/ArtesterLogo2.png";
import React from 'react'
import Footer from '@/components/UserComponents/Footer';

const Subscription = () => {

  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab'); 
  return (
    <div>
      <div>
        <SubscriptionSec1/>
      </div>
      <div>
        <SubscriptionSec2/>
      </div>
      <div className='lg:hidden'>
        <SubscriptionSec3/>
      </div>
      <div className='hidden lg:block'>
        <SubscriptionSec3Desktop/>
      </div>
      <div>
        <SubscriptionSec4 urlTab={tabParam}/>
      </div>
      <div>
        <SubscriptionSec5/>
      </div>
      <div>
        <SubscriptionSec6/>
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

export default Subscription
