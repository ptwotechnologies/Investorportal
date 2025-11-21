import React, { useState } from 'react';

const PricingSec4 = () => {

    const [activeIndex, setActiveIndex] = useState(null);
    const faqs = [
      {
        question: 'Is this just another agency trying to sell me stuff?',
        answer: 'Answer 1',
      },
      {
        question: 'Is this just another agency trying to sell me stuff?',
        answer: 'Answer 2',
      },
      {
        question: 'Who’s behind this platform?',
        answer: 'Answer 3',
      },
       {
        question: 'Who’s behind this platform?',
        answer: 'Answer 1',
      },
      {
        question: 'Getting Started',
        answer: 'Answer 2',
      },
      {
        question: 'Getting Started',
        answer: 'Answer 3',
      },
      {
        question: 'Eligibility',
        answer: 'Answer 3',
      },
      {
        question: 'Eligibility',
        answer: 'Answer 3',
      },
      {
        question: 'Expert Consultations',
        answer: 'Answer 3',
      },
      {
        question: 'Expert Consultations',
        answer: 'Answer 3',
      },
    ];
  
    const toggleFAQ = (index) => {
      setActiveIndex(index === activeIndex ? null : index);
    };
  return (
    <div className="w-full mx-auto p-10 lg:px-30 ">
          <h1 className="text-3xl font-bold mb-4 text-[#001032] lg:hidden ">Here’s what founders usually ask</h1>
        <h1 className="text-3xl font-bold mb-4 text-[#001032] hidden lg:block ">FAQ</h1>
         <h1 className="text-md mb-6 text-[#001032] ">Trust & Safety</h1>
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
  )
}

export default PricingSec4