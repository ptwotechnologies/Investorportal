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
      if (file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk(dir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // Replace <div className="flex flex-col h-full bg-[#FDFDFF] overflow-hidden">
  content = content.replace(/className=['"]flex flex-col h-full bg-\[#FDFDFF\] overflow-hidden['"]/g, 'className="flex flex-col flex-1 min-h-0 bg-[#FDFDFF] overflow-hidden"');
  
  // Replace <div className="flex flex-col h-full overflow-hidden"> (in case it exists)
  content = content.replace(/className=['"]flex flex-col h-full overflow-hidden['"]/g, 'className="flex flex-col flex-1 min-h-0 overflow-hidden"');

  // Replace <div className="flex-1 overflow-hidden"> wrapping BottomSec
  // Be very careful to only replace exactly this, since flex-1 overflow-hidden without min-h-0 breaks in flex containers when content grows
  content = content.replace(/className=['"]flex-1 overflow-hidden['"]/g, 'className="flex-1 flex flex-col min-h-0 overflow-hidden"');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed', path.basename(file));
  }
});
