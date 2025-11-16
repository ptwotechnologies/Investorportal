import ChannelPartnerSec1 from '@/components/UserComponents/ChannelPartnersSec/ChannelPartnerSec1'
import ChannelPartnerSec2 from '@/components/UserComponents/ChannelPartnersSec/ChannelPartnerSec2'
import ChannelPartnerSec3 from '@/components/UserComponents/ChannelPartnersSec/ChannelPartnerSec3'
import ChannelPartnerSec4 from '@/components/UserComponents/ChannelPartnersSec/ChannelPartnerSec4'
import React from 'react'

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
        <ChannelPartnerSec4/>
      </div>
    </div>
  )
}

export default ChannelPartners
