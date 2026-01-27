import React, { useState } from 'react';

const InvestorSec10 = () => {
   const [activeIndex, setActiveIndex] = useState(null);
      const faqs = [
        {
          question: 'Who is this platform for?',
          answer: 'This platform is built for angel investors, venture capital professionals, family offices, and strategic investors seeking curated startup access and meaningful engagement.',
        },
        {
          question: 'How is this different from other investor platforms?',
          answer: 'We focus on quality over volume. Startups are reviewed, participants are verified, and interactions are structured—reducing noise and saving investor time.',
        },
        {
          question: 'Do I get access to curated deal flow?',
          answer: 'Yes. Investors can explore startups through curated listings and filters aligned with their interests, stages, and sectors.',
        },
         {
          question: 'How are startups vetted?',
          answer: 'Startup profiles are reviewed for clarity, seriousness, and intent before being listed. This helps ensure credible, well-prepared founders and reduces low-quality submissions.',
        },
        {
          question: 'Can I control what opportunities I see?',
          answer: 'Yes. You can filter startups based on stage, sector, geography, and other relevant criteria—allowing you to focus on opportunities that match your thesis.',
        },
        {
          question: 'Is there any obligation to invest?',
          answer: 'No. The platform provides access and visibility—not pressure or obligation. All investment decisions remain entirely at your discretion.',
        },
        {
          question: 'How do I interact with founders?',
          answer: 'You can engage with founders through structured platform interactions such as profile access, inbound interest, or curated introductions—depending on your preferences.',
        },
        {
          question: 'Will my identity or activity be visible to founders?',
          answer: 'You control your visibility. You can choose whether to browse anonymously or engage openly with founders.',
        },
        {
          question: 'Is my information and activity confidential?',
          answer: 'Yes. All data and interactions are protected, and platform activity follows strict privacy and security standards.',
        },
        {
          question: 'How much time do I need to commit?',
          answer: 'There is no fixed commitment. You can explore opportunities at your own pace and engage only when something aligns with your interests.',
        },
      ];
    
      const faqs2 = [
        
        {
          question: 'Who is this platform for?',
          answer: 'This platform is built for angel investors, venture capital professionals, family offices, and strategic investors seeking curated startup access and meaningful engagement.',
        },
        {
          question: 'How is this different from other investor platforms?',
          answer: 'We focus on quality over volume. Startups are reviewed, participants are verified, and interactions are structured—reducing noise and saving investor time.',
        },
        {
          question: 'Do I get access to curated deal flow?',
          answer: 'Yes. Investors can explore startups through curated listings and filters aligned with their interests, stages, and sectors.',
        },
         {
          question: 'Is there a cost to join as an investor?',
          answer: 'Basic access is available. Certain advanced features or enhanced access tools may be offered under premium plans.',
        },
        {
          question: 'Is this platform worth my time as an investor?',
          answer: 'If you value curated access, reduced noise, and structured founder engagement over unfiltered deal flow, this platform is designed to support your investment process.',
        },
      ];
    
      const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
      };
     
       return (
         <div className="w-full mx-auto px-4 py-6 pb-10 lg:py-10 lg:px-30 mt-8">
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
       );
}

export default InvestorSec10
