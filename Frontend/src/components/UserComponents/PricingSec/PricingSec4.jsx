import React, { useState } from 'react';

const PricingSec4 = () => { 
const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: 'Is this an agency or a curated investor & expert platform?',
      answer: 'This is a curated platform—not an agency. We don’t represent startups or sell services. Instead, we provide direct access to verified investors, experts, and growth resources in one structured ecosystem.',
    },
    {
      question: 'Who is this platform built for?',
      answer: 'The platform is built for founders actively building or scaling startups, as well as investors and experts looking for credible, high-quality opportunities and engagements.',
    },
    {
      question: 'How do you verify investors and experts?',
      answer: 'All investors and experts are reviewed based on experience, relevance, and intent. This ensures founders interact with serious, qualified participants—not random listings or inactive profiles.',
    },
     {
      question: 'Is my startup information safe and confidential?',
      answer: 'Yes. Your data and interactions are protected. Sensitive details are only shared when you choose to engage, and all platform activity follows strict privacy and security standards.',
    },
    {
      question: 'How do founders and investors connect on the platform?',
      answer: 'Founders can create a profile, showcase their startup, and explore relevant investors or experts. Connections happen through structured access—profiles, consultations, and platform-enabled interactions.',
    },
    {
      question: 'Do I need to pay to join the platform?',
      answer: 'You can sign up and explore the platform at no cost. Advanced features such as premium visibility, expert consultations, or investor tools may require a paid plan.',
    },
    {
      question: 'Who are the experts on this platform?',
      answer: 'Experts are experienced founders, operators, investors, and domain specialists who have worked hands-on with startups across growth, product, legal, and fundraising stages.',
    },
    {
      question: 'How do expert consultations work?',
      answer: 'Founders can browse expert profiles, book sessions, and get focused, one-to-one guidance. Each consultation is structured to deliver clear, actionable outcomes.',
    },
    {
      question: 'What makes this platform different from other investor portals?',
      answer: 'We prioritize quality over volume. Every participant is curated, interactions are intentional, and the platform is designed to save time, reduce noise, and create real outcomes for founders and investors.',
    },
    {
      question: 'Is this platform right for me right now?',
      answer: 'If you’re building a startup and need credible access—to investors, expertise, or strategic support—this platform is designed to help you move forward with clarity and confidence.',
    },
  ];

  const faqs2 = [
    
    {
      question: 'Is this an agency or a curated investor & expert platform?',
      answer: 'This is a curated platform—not an agency. We don’t represent startups or sell services. Instead, we provide direct access to verified investors, experts, and growth resources in one structured ecosystem.',
    },
    {
      question: 'Who is this platform built for?',
      answer: 'The platform is built for founders actively building or scaling startups, as well as investors and experts looking for credible, high-quality opportunities and engagements.',
    },
    {
      question: 'How do you verify investors and experts?',
      answer: 'All investors and experts are reviewed based on experience, relevance, and intent. This ensures founders interact with serious, qualified participants—not random listings or inactive profiles.',
    },
     {
      question: 'Is my startup information safe and confidential?',
      answer: 'Yes. Your data and interactions are protected. Sensitive details are only shared when you choose to engage, and all platform activity follows strict privacy and security standards.',
    },
    {
      question: 'How do founders and investors connect on the platform?',
      answer: 'Founders can create a profile, showcase their startup, and explore relevant investors or experts. Connections happen through structured access—profiles, consultations, and platform-enabled interactions.',
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

export default PricingSec4