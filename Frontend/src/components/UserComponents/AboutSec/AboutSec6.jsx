import React, { useState } from 'react';


const AboutSec6 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
      const faqs = [
        {
          question: 'Getting Started',
          answer: 'Answer 1',
        },
        {
          question: 'Eligibility',
          answer: 'Answer 2',
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
   <div className="w-[60%]  p-10  ">
        <h1 className="text-4xl font-bold mb-10 text-[#001032] w-[50%] ">Here’s what founders usually ask</h1>
       <h1 className="text-xl font-medium mb-6 text-[#001032] ">Trust & Safety</h1>
       <div className='  '>
      {faqs.map((faq, index) => (
         <div key={index} className=" border-t border-[#0010321A] py-4 ">
          <div
            className="flex justify-between items-center cursor-pointer p-4"
            onClick={() => toggleFAQ(index)}
          >
            <h2 className="text-xl font-medium  text-[#001032]">{faq.question}</h2>
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

export default AboutSec6