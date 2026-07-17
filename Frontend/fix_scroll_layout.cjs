const fs = require('fs');
const path = require('path');

const dir = 'd:/investorportal+collaboration/investorportal/Frontend/src/components/UserComponents/ProfileSec/DealSec';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('Bottom.jsx') || file.endsWith('BottomSec.jsx') || file.endsWith('DealSec1.jsx') || file.endsWith('DealDraft1.jsx') || file.endsWith('AnalyticsSec.jsx') || file.endsWith('CommunicationSec.jsx') || file.endsWith('CompletedDealsSec.jsx') || file.endsWith('DisputesSec.jsx') || file.endsWith('DocumentSec.jsx') || file.endsWith('MilestoneSec.jsx') || file.endsWith('NegotiationSec.jsx') || file.endsWith('DealPaymentSec.jsx') || file.endsWith('RevenueSec.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(dir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Fix Left Column: ensure it has flex flex-col flex-1 min-h-0
  // Often looks like: className={`flex-1 min-h-0 space-y-4 ...`} or className={`flex-1 space-y-6 overflow-y-auto ...`}
  // Instead of complex regex, let's target the parent wrapper and the Right Column.

  // 1. Root wrapper of Bottom.jsx components
  // Look for: className="flex flex-col lg:flex-row gap-2 lg:px-4 lg:py-2 bg-[#FDFDFF]"
  content = content.replace(/className=(['"])flex flex-col lg:flex-row gap-2 lg:px-4 lg:py-2 bg-\[#FDFDFF\](?: flex-1 min-h-0)?(?: lg:overflow-hidden)?(?: overflow-hidden)?(['"])/g, 
    'className=$1flex flex-col lg:flex-row gap-2 flex-1 min-h-0 lg:px-4 lg:py-2 bg-[#FDFDFF]$2'
  );
  content = content.replace(/className=(['"])flex flex-col lg:flex-row gap-2 flex-1 min-h-0 lg:px-4 lg:py-2 bg-\[#FDFDFF\] lg:overflow-hidden(['"])/g, 
    'className=$1flex flex-col lg:flex-row gap-2 flex-1 min-h-0 lg:px-4 lg:py-2 bg-[#FDFDFF]$2'
  );

  // 2. Right Column wrapper
  // Look for: className={`w-full lg:w-[450px] xl:w-[550px] flex flex-col ${...}`} or similar
  content = content.replace(/className=\{`([^`]*w-\[450px\][^`]*) flex flex-col (?!.*flex-1 min-h-0)([^`]*)`\}/g, 
    'className={`$1 flex flex-col flex-1 min-h-0 $2`}'
  );
  // Also catch variations without w-full
  content = content.replace(/className=\{`lg:w-\[450px\] xl:w-\[550px\] mt-5 lg:mt-auto flex flex-col (?!.*flex-1 min-h-0)([^`]*)`\}/g, 
    'className={`lg:w-[450px] xl:w-[550px] mt-5 px-1 lg:px-0 lg:mt-auto flex flex-col flex-1 min-h-0 $1`}'
  );

  // 3. Fix Right Column missing "flex" on mobile when block is used
  // If it's: : "block"}`} change to : "flex"}`} for the Right column
  content = content.replace(/flex-1 min-h-0 \$\{([^?]*) \? (['"])hidden lg:block(['"]) : (['"])block(['"])\}/g, 
    'flex-1 min-h-0 ${$1 ? $2hidden lg:flex$3 : $4flex$5}'
  );

  // 4. Ensure Left Column wrapper has flex flex-col flex-1 min-h-0 if it doesn't
  content = content.replace(/className=\{`flex-1(?: min-h-0)? space-y-[46] overflow-y-auto scrollbar-hide p-2/g, 
    'className={`flex-1 space-y-4 flex flex-col min-h-0 overflow-y-auto scrollbar-hide p-2'
  );
  content = content.replace(/className=\{`flex-1 flex flex-col py-2 gap-6 overflow-hidden/g, 
    'className={`flex-1 flex flex-col min-h-0 py-2 gap-6 overflow-hidden'
  );

  // Double spaces
  content = content.replace(/  +/g, ' ');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed Scroll Layout', path.basename(file));
  }
});
