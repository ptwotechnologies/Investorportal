import React from 'react'
import { HiOutlineCheckBadge, HiOutlineBanknotes, HiOutlineChatBubbleLeftRight, HiOutlineArrowsRightLeft, HiOutlineAcademicCap } from "react-icons/hi2";

function Item({ label, icon: Icon }) {
  return (
    <div className="flex flex-col items-center gap- gap-y-4">
      {/* decorative placeholder icon */}
      <div className="h-14 w-14 bg-[#E5E5E5] border border-border flex items-center justify-center">
        {Icon && <Icon size={30} className="text-[#001032]" />}
      </div>
      <p className="text-center text-[13px] lg:text-md text-[#001032]" dangerouslySetInnerHTML={{ __html: label }} />
    </div>
  )
}

function Divider() {
  return (
    <div className="flex items-center justify-center ">
      <div className="h-35 border-l border-[#00103233]"  />
    </div>
  )
}

function HRule() {
  return (
    <div className="justify-self-center w-35">
      <div className="h-px w-full border-t border-[#00103233]"  />
    </div>
  )
}

const JoinUsSec2 = () => {
  return (
   <>
    <div className='lg:my-10'>
      <div className="max-w-[1500px] mx-auto w-full px-4 lg:!px-10 min-[1500px]:!px-0">
        <div id='desktop' className="hidden lg:block py-10">
          <div className="flex justify-evenly items-center gap-10">
            <div className="flex justify-center items-center gap-7 w-full">
              <div className="flex-1">
                <div className="w-15 h-15 bg-[#E5E5E5] mb-5 mx-auto flex items-center justify-center">
                  <HiOutlineCheckBadge size={35} className="text-[#001032]" />
                </div>
                <p className="text-[#001032] text-center tracking-wide leading-8 text-xl">Verified Client <br /> pipelines</p>
              </div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
              <div className="flex-1">
                <div className="w-15 h-15 bg-[#E5E5E5] mb-5 mx-auto flex items-center justify-center">
                  <HiOutlineBanknotes size={35} className="text-[#001032]" />
                </div>
                <p className="text-[#001032] text-center tracking-wide leading-8 text-xl">Admin-Controlled <br /> Payments</p>
              </div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
              <div className="flex-1">
                <div className="w-15 h-15 bg-[#E5E5E5] mb-5 mx-auto flex items-center justify-center">
                  <HiOutlineChatBubbleLeftRight size={35} className="text-[#001032]" />
                </div>
                <p className="text-[#001032] text-center tracking-wide leading-8 text-xl">Post-Sales <br /> Support</p>
              </div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
              <div className="flex-1">
                <div className="w-15 h-15 bg-[#E5E5E5] mb-5 mx-auto flex items-center justify-center">
                  <HiOutlineArrowsRightLeft size={35} className="text-[#001032]" />
                </div>
                <p className="text-[#001032] text-center tracking-wide leading-8 text-xl">Automated Client <br /> Matching</p>
              </div>
              <div className="h-30 w-0.5 bg-[#00103233]"></div>
              <div className="flex-1">
                <div className="w-15 h-15 bg-[#E5E5E5] mb-5 mx-auto flex items-center justify-center">
                  <HiOutlineAcademicCap size={35} className="text-[#001032]" />
                </div>
                <p className="text-[#001032] text-center tracking-wide leading-8 text-xl">Industry Experts <br /> Guidance</p>
              </div>
            </div>
          </div>
          <hr className="mt-10" />
        </div>

        <div id="phoneScreen" className="lg:hidden">
          <section className="w-full bg-background">
            <div className="mx-auto py-2">
              <div className='grid grid-cols-3 gap-y-10 items-center'>
                <Item label="Verified Client pipelines" icon={HiOutlineCheckBadge} />
                <Divider />
                <Item label="Admin-Controlled Payments" icon={HiOutlineBanknotes} />
                <HRule />
                <div />
                <HRule />
                <Item label="Post-Sales Support" icon={HiOutlineChatBubbleLeftRight} />
                <Divider />
                <Item label="Automated Client Matching" icon={HiOutlineArrowsRightLeft} />
                <div className="col-start-2">
                  <Item label="Industry Experts Guidance" icon={HiOutlineAcademicCap} />
                </div>
              </div>
              <hr className="mt-15 border-t border-[#00103233]" aria-hidden="true" />
            </div>
          </section>
        </div>
      </div>
    </div>
   </>
  )
}

export default JoinUsSec2
