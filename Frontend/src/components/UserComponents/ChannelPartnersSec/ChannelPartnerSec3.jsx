import React, { useState } from 'react';

const ChannelPartnerSec3 = () => {

     const [activeIndex, setActiveIndex] = useState(null);
       const faqs = [
         {
           question: 'Who can become a channel partner?',
           answer: 'Incubators, accelerators, startup communities, consultants, ecosystem builders, and organizations that actively support founders and startups can become channel partners.',
         },
         {
           question: 'What does a channel partner do on this platform?',
           answer: 'Channel partners introduce relevant startups, founders, or professionals to the platform and help expand the ecosystem through trusted relationships.',
         },
         {
           question: 'Is this a referral-based partnership?',
           answer: 'Yes. The partnership is primarily referral-driven, with structured collaboration models depending on the nature and scale of the partnership.',
         },
          {
           question: 'What are the benefits of becoming a channel partner?',
           answer: 'Channel partners gain access to a credible startup ecosystem, visibility on the platform, and potential revenue or strategic benefits based on partnership terms.',
         },
         {
           question: 'How do channel partners earn or benefit financially?',
           answer: 'Depending on the partnership model, benefits may include referral incentives, revenue sharing, or long-term strategic collaboration opportunities.',
         },
         {
           question: 'Is there any cost to join as a channel partner?',
           answer: 'No upfront cost is required to explore partnership opportunities. Specific collaboration models may be defined based on mutual alignment.',
         },
         {
           question: 'How do you ensure startups referred by me are treated professionally?',
           answer: 'All founders are onboarded through structured processes, ensuring transparency, respect, and professional engagement—protecting your reputation and relationships.',
         },
         {
           question: 'Will my network data be protected?',
           answer: 'Yes. Partner and referral information is handled with strict confidentiality and is never misused or shared without consent.',
         },
         {
           question: 'How does the onboarding process work for channel partners?',
           answer: 'Once approved, channel partners receive clear onboarding, guidelines, and access to partnership tools to manage referrals and collaborations smoothly.',
         },
         {
           question: 'Is there a minimum commitment or volume requirement?',
           answer: 'No fixed minimums. Partnerships are flexible and designed to grow organically based on mutual value and engagement.',
         },
       ];
     
       const faqs2 = [
         
         {
           question: 'Who can become a channel partner?',
           answer: 'Incubators, accelerators, startup communities, consultants, ecosystem builders, and organizations that actively support founders and startups can become channel partners.',
         },
         {
           question: 'What does a channel partner do on this platform?',
           answer: 'Channel partners introduce relevant startups, founders, or professionals to the platform and help expand the ecosystem through trusted relationships.',
         },
         {
           question: 'Is this a referral-based partnership?',
           answer: 'Yes. The partnership is primarily referral-driven, with structured collaboration models depending on the nature and scale of the partnership.',
         },
          {
           question: 'Can this partnership scale over time?',
           answer: 'Yes. The platform is built to support long-term partnerships, evolving collaboration models, and deeper ecosystem integration as both sides grow.',
         },
         {
           question: 'Is this platform right for me as a channel partner?',
           answer: 'If you work closely with startups and value credible platforms, structured collaboration, and long-term ecosystem growth, this partnership is designed to align with your goals.',
         },
       ];
     
       const toggleFAQ = (index) => {
         setActiveIndex(index === activeIndex ? null : index);
       };

  return (
     <div className="w-full mx-auto px-4 py-10 lg:px-30 mt-10">
        <h1 className="text-3xl font-bold mb-4 text-[#001032] lg:hidden ">Here’s what founders usually ask</h1>
      <h1 className="text-3xl font-bold mb-4 text-[#001032] hidden lg:block ">FAQ</h1>
       <h1 className="text-md mb-6 text-[#001032] hidden lg:block ">Trust & Safety</h1>
       <div className='hidden lg:block'>
        <div className=' grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 '>
      {faqs.map((faq, index) => (
         <div key={index} className=" border-t border-[#0010321A] py-4 ">
          <div
            className="flex justify-between items-center cursor-pointer p-4"
            onClick={() => toggleFAQ(index)}
          >
            <h2 className="text-xs font-medium text-[#001032B5]">{faq.question}</h2>
            <svg
              className={`w-4 h-4 transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"                      
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {activeIndex === index && (
            <div className="mt-4 px-4">
              <p className="text-[#0000004d] text-sm pr-4">{faq.answer}</p>
            </div>
          )}
        </div>
      
      ))}
       </div>

       </div>
       <div className='lg:hidden'>
        <div className=' grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 '>
      {faqs2.map((faq, index) => (
         <div key={index} className=" border-t border-[#0010321A] py-4 ">
          <div
            className="flex justify-between items-center cursor-pointer p-4"
            onClick={() => toggleFAQ(index)}
          >
            <h2 className="text-xs font-medium text-[#001032B5]">{faq.question}</h2>
            <svg
              className={`w-4 h-4 transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"                      
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {activeIndex === index && (
            <div className="mt-4 px-4">
              <p className="text-[#0000004d] text-sm pr-4">{faq.answer}</p>
            </div>
          )}
        </div>
      
      ))}
       </div>
   <hr />
       </div>
    </div>
  )
}

export default ChannelPartnerSec3