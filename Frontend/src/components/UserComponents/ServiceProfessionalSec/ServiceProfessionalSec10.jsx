import React, { useState } from 'react';

const ServiceProfessionalSec10 = () => {
 const [activeIndex, setActiveIndex] = useState(null);
   const faqs = [
     {
       question: 'Who can join as a service professional?',
       answer: 'Experienced consultants, advisors, operators, and service providers with proven startup or industry experience can join the platform. All profiles are reviewed to maintain quality and credibility.',
     },
     {
       question: 'What types of service professionals are accepted?',
       answer: 'We welcome professionals across product, technology, growth, marketing, legal, compliance, finance, HR, operations, and fundraising support.',
     },
     {
       question: 'Why should I join this platform?',
       answer: 'The platform helps you connect with serious founders who are actively building and seeking credible expertise—not casual inquiries or cold leads.',
     },
      {
       question: 'How will founders discover my profile?',
       answer: 'Founders can discover service professionals through curated listings, category filters, and platform-recommended matches based on their needs.',
     },
     {
       question: 'Can I choose who I work with?',
       answer: 'Yes. You have full control over which founders you engage with and which requests you accept.',
     },
     {
       question: 'Are engagements paid or free?',
       answer: 'Engagements can be paid or structured based on your offerings. You decide your availability, consultation format, and pricing.',
     },
     {
       question: 'How do you ensure founders are serious?',
       answer: 'Founder profiles are reviewed, and platform interactions are structured to reduce noise and low-intent requests—respecting your time and expertise.',
     },
     {
       question: 'Is my professional reputation protected?',
       answer: 'Yes. Your profile represents your experience and expertise, and interactions are designed to be respectful, transparent, and professional.',
     },
     {
       question: 'How do consultations or engagements work?',
       answer: 'You can offer structured consultations, advisory sessions, or service-based engagements. Founders book or request access through the platform, keeping interactions organized and focused.',
     },
     {
       question: 'Do I need to commit long-term?',
       answer: 'No. You control your level of involvement. You can engage occasionally or actively, depending on your availability.',
     },
   ];
 
   const faqs2 = [
     
     {
       question: 'What types of service professionals are accepted?',
       answer: 'We welcome professionals across product, technology, growth, marketing, legal, compliance, finance, HR, operations, and fundraising support.',
     },
     {
       question: 'Who can join as a service professional?',
       answer: 'Experienced consultants, advisors, operators, and service providers with proven startup or industry experience can join the platform. All profiles are reviewed to maintain quality and credibility.',
     },
     {
       question: 'Is this platform right for me as a service professional?',
       answer: 'If you value meaningful work, credible founders, and structured engagements over random leads, this platform is designed to support your professional growth.',
     },
      {
       question: 'Can I leave or pause my profile anytime?',
       answer: 'Yes. You can update, pause, or deactivate your profile at any time without penalties.',
     },
     {
       question: 'Is there a cost to join as a service professional?',
       answer: 'Basic profile creation is available. Certain features such as premium visibility, advanced tools, or enhanced access may be part of a paid plan.',
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

export default ServiceProfessionalSec10
