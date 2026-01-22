import React, { useState } from 'react';

const StartupSec10 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
    const faqs = [
      {
        question: 'Who is this platform for?',
        answer: 'This platform is built for startup founders at early to growth stages who are actively building, validating, or scaling their business and need access to investors, experts, and structured support.',
      },
      {
        question: 'Do I need to be fundraising to join?',
        answer: 'No. You don’t need to be actively fundraising. Founders can use the platform to refine their strategy, validate their approach, access expert guidance, and prepare for future fundraising.',
      },
      {
        question: 'What stages of startups are supported?',
        answer: 'We support idea-stage, MVP-stage, early-revenue, and growth-stage startups. The focus is on clarity, commitment, and execution—not just valuation or traction.',
      },
       {
        question: 'How will investors discover my startup?',
        answer: 'Investors can discover startups through curated listings, search filters, and platform-driven visibility tools. You remain in control of what information is visible and when you choose to engage.',
      },
      {
        question: 'Can I directly contact investors?',
        answer: 'Access to investors is structured to maintain quality and relevance. Depending on your plan, you may request introductions, receive inbound interest, or engage through platform-enabled interactions.',
      },
      {
        question: 'Is there any guarantee of funding?',
        answer: 'No platform can guarantee funding. What we provide is meaningful access, visibility, and preparation—helping you engage the right investors at the right time.',
      },
      {
        question: 'What kind of expert support can I get?',
        answer: 'You can access experts across fundraising, product, growth, legal, compliance, operations, and go-to-market strategy—based on your startup’s needs.',
      },
      {
        question: 'How do expert consultations help founders?',
        answer: 'Consultations are focused and outcome-driven. Founders use them to validate decisions, avoid costly mistakes, and move forward with clarity and confidence.',
      },
      {
        question: 'Is my startup reviewed before being listed?',
        answer: 'Yes. Startup profiles are reviewed to maintain platform quality. This helps ensure meaningful engagement with investors and experts.',
      },
      {
        question: 'What information do I need to share?',
        answer: 'You start with high-level details such as your idea, stage, and goals. Sensitive information is shared only when you choose to engage further.',
      },
    ];
  
    const faqs2 = [
      
      {
        question: 'Who is this platform for?',
        answer: 'This platform is built for startup founders at early to growth stages who are actively building, validating, or scaling their business and need access to investors, experts, and structured support.',
      },
      {
        question: 'Do I need to be fundraising to join?',
        answer: 'No. You don’t need to be actively fundraising. Founders can use the platform to refine their strategy, validate their approach, access expert guidance, and prepare for future fundraising.',
      },
      {
        question: 'Is there a free plan for startups?',
        answer: 'Yes. Founders can create a profile and explore the platform with basic access. Premium features such as enhanced visibility, investor access, and expert consultations may require a paid plan.',
      },
       {
        question: 'Can I upgrade or cancel anytime?',
        answer: 'Yes. Plans are flexible, and you can upgrade, downgrade, or cancel based on your needs.',
      },
      {
        question: 'Is this platform right for my startup right now?',
        answer: 'If you’re serious about building, learning, and connecting with the right people—not chasing random introductions—this platform is designed to support your journey.',
      },
    ];
  
    const toggleFAQ = (index) => {
      setActiveIndex(index === activeIndex ? null : index);
    };
   
     return (
       <div className="w-full mx-auto px-4 py-6 pb-10 lg:py-10 lg:px-30 ">
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
              <p className="text-[#0010324D]">{faq.answer}</p>
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
              <p className="text-[#0010324D]">{faq.answer}</p>
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

export default StartupSec10
