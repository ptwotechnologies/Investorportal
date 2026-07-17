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

  // 1. Fix root h-full -> flex-1 min-h-0
  content = content.replace(/className=(['"])flex flex-col h-full /g, 'className=$1flex flex-col flex-1 min-h-0 ');
  content = content.replace(/className=(['"])flex flex-col h-full(["'])/g, 'className=$1flex flex-col flex-1 min-h-0$2');
  
  // 2. Remove bad hardcoded heights on flex containers
  content = content.replace(/lg:h-\[6\d0px\] xl:flex-1 min-h-0/g, 'flex-1 min-h-0');
  content = content.replace(/lg:h-\[6\d0px\] xl:flex-1/g, 'flex-1 min-h-0');
  
  // 3. Ensure all flex-1 containers with flex-col or overflow have min-h-0
  content = content.replace(/flex-1 flex flex-col(?![^"']*min-h-0)/g, 'flex-1 flex flex-col min-h-0');
  
  // 4. Ensure flex-1 containers with overflow-y-auto have min-h-0
  content = content.replace(/flex-1(?![^"']*min-h-0)([^"']*overflow-y-auto)/g, 'flex-1 min-h-0$1');
  
  // 5. Ensure flex-1 overflow-hidden wrappers get flex-col and min-h-0 (typically used for middle wrappers)
  content = content.replace(/className=(['"])flex-1 overflow-hidden(['"])/g, 'className=$1flex-1 flex flex-col min-h-0 overflow-hidden$2');

  // Let's also remove `h-auto` that was left behind from `lg:h-[640px] xl:min-h-[85vh] h-auto` 
  // if it's next to `flex-1 min-h-0 overflow-hidden`
  content = content.replace(/h-auto flex-1 min-h-0 overflow-hidden/g, 'flex-1 min-h-0 overflow-hidden');
  content = content.replace(/flex-1 min-h-0 h-auto overflow-hidden/g, 'flex-1 min-h-0 overflow-hidden');

  // Fix any remaining max-h-[610px] left behind
  content = content.replace(/max-h-\[610px\]/g, 'flex-1 min-h-0');
  content = content.replace(/max-h-full/g, 'flex-1 min-h-0');
  content = content.replace(/xl:max-h-full/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed', path.basename(file));
  }
});
