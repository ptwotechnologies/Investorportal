import ChannelPartnerSec1 from '@/components/UserComponents/ChannelPartnersSec/ChannelPartnerSec1'
import ChannelPartnerSec2 from '@/components/UserComponents/ChannelPartnersSec/ChannelPartnerSec2'
import ChannelPartnerSec3 from '@/components/UserComponents/ChannelPartnersSec/ChannelPartnerSec3'
import React from 'react'
import logo from "/ArtesterLogo2.png";

const ChannelPartners = () => {
  return (
    <div>
        <div>
            <ChannelPartnerSec1/>
        </div>
        <div>
          <ChannelPartnerSec2/>
        </div>
        <div>
          <ChannelPartnerSec3/>
        </div>
        <div>
                             <img src={logo} className='w-60 lg:w-90 mx-auto mb-9 lg:mb-15'/>
                           </div>
    </div>
  )
}

export default ChannelPartners