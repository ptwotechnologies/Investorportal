import React from 'react'
import TopBar from './TopBar'
import Bottom from './Bottom'


const DisputesSec = () => {
  const [isCreateMode, setIsCreateMode] = React.useState(false);

  return (
   <div>
      <div id='top'>
         <TopBar onCreateClick={() => setIsCreateMode(true)} />
      </div>

      <div id='bottom'>
        <Bottom isCreateMode={isCreateMode} setIsCreateMode={setIsCreateMode} />
      </div>
    </div>
  )
}

export default DisputesSec
