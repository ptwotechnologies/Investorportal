
import SubscriptionSec1 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec1'
import SubscriptionSec2 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec2'
import SubscriptionSec3 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec3'
import SubscriptionSec3Desktop from '@/components/UserComponents/SubscriptionSec/SubscriptionSec3Desktop'


import SubscriptionSec4 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec4'
import SubscriptionSec5 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec5'

import SubscriptionSec6 from '@/components/UserComponents/SubscriptionSec/SubscriptionSec6'

import React from 'react'

const ChannelPartners = () => {
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
        <SubscriptionSec4/>
      </div>
      <div>
        <SubscriptionSec5/>
      </div>
      <div>
        <SubscriptionSec6/>
      </div>
    </div>
  )
}

export default ChannelPartners
