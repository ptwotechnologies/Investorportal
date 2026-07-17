const fs = require('fs');
const path = require('path');
const dir = 'd:/investorportal+collaboration/investorportal/Frontend/src/Pages/UserPages/ProfilePages/';

const filesToFix = [
  'ActiveDeal.jsx',
  'Milestones.jsx',
  'DealPayment.jsx',
  'Negotiation.jsx',
  'Documentation.jsx',
  'Completed.jsx',
  'Disputes.jsx',
  'DealDraft.jsx'
];

filesToFix.forEach(file => {
  const filepath = path.join(dir, file);
  if (!fs.existsSync(filepath)) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  content = content.replace(
    /className=['"]bg-gray-100 min-h-screen['"]/g,
    `className='bg-gray-100 min-h-screen lg:relative fixed inset-0 flex flex-col overflow-hidden'`
  );
  
  content = content.replace(
    /<div className=['"]max-w-\[1600px\] mx-auto w-full min-h-screen['"]>/g,
    `<div className='max-w-[1600px] mx-auto w-full flex-1 flex flex-col min-h-0'>`
  );
  
  content = content.replace(
    /<div className=['"]lg:flex min-h-screen['"]>/g,
    `<div className='flex flex-col lg:flex-row flex-1 min-h-0'>`
  );
  
  content = content.replace(
    /<div className=['"]flex-1 transition-all duration-300 ([^>]+) lg:min-h-screen['"]>/g,
    `<div className='flex-1 flex flex-col min-h-0 transition-all duration-300 $1'>`
  );
  
  fs.writeFileSync(filepath, content);
  console.log('Fixed', file);
});
