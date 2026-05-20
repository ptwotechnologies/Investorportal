import React from 'react'

const ScrollAreaSec = ({ onRoleSelect }) => {
  return (
    <div className='w-full'>
      <div className="flex flex-col gap-4 px-4 py-4">
        
        {/* Card 1 */}
        <div className='flex justify-between items-center w-[75%] bg-[#1927461A] text-[#000000CC] p-4 rounded-lg border border-[#00000040] shadow-md'>
          <h3 className='text-md font-medium text-[#001032]'>Refer a startup</h3>
          <button 
            onClick={() => onRoleSelect("Startups")}
            className='bg-[#001032] text-white px-3 py-1.5 rounded-sm text-xs font-medium'>
            Get Started
          </button>
        </div>

        {/* Card 2 */}
        <div className='flex justify-between items-center w-[85%] bg-[#0010321A] text-[#000000CC] p-4 rounded-lg border border-[#00000040] shadow-md'>
          <h3 className='text-md font-medium text-[#001032]'>Refer a investor</h3>
          <button 
            onClick={() => onRoleSelect("Investors")}
            className='bg-[#001032] text-white px-3 py-1.5 rounded-sm text-xs font-medium'>
            Get Started
          </button>
        </div>

        {/* Card 3 */}
        <div className='flex justify-between items-center w-full bg-[#0606061A] text-[#000000CC] p-4 rounded-lg border border-[#00000040] shadow-md'>
          <h3 className='text-md font-medium text-[#001032]'>Refer a service professional</h3>
          <button 
            onClick={() => onRoleSelect("Service Professionals")}
            className='bg-[#001032] text-white px-3 py-1.5 rounded-sm text-xs font-medium'>
            Get Started
          </button>
        </div>

      </div>
    </div>
  )
}

export default ScrollAreaSec
