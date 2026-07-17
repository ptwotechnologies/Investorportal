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
  
  // Replace the Left Column max-h container:
  content = content.replace(/max-h-\[610px\] xl:max-h-full/g, 'flex flex-col flex-1 min-h-0');
  // Also max-h-[600px] or similar if exists:
  content = content.replace(/max-h-\[600px\] xl:max-h-full/g, 'flex flex-col flex-1 min-h-0');

  // Replace the Right Column wrapper:
  content = content.replace(/lg:h-\[6\d0px\] xl:min-h-\[85vh\] h-\[\d0px\]/g, 'flex-1 min-h-0');
  content = content.replace(/lg:h-\[6\d0px\] xl:min-h-\[85vh\] h-auto/g, 'flex-1 min-h-0');
  
  // Replace standalone min-h-[85vh] or h-screen which are used as wrappers:
  content = content.replace(/min-h-\[85vh\]/g, 'flex-1 min-h-0');
  content = content.replace(/lg:h-\[85vh\]/g, 'flex-1 min-h-0');
  content = content.replace(/h-\[85vh\]/g, 'flex-1 min-h-0');
  content = content.replace(/lg:min-h-\[85vh\]/g, 'flex-1 min-h-0');
  content = content.replace(/lg:min-h-\[80vh\]/g, 'flex-1 min-h-0');
  content = content.replace(/h-\[88vh\]/g, 'flex-1 min-h-0');
  content = content.replace(/lg:h-\[88vh\]/g, 'flex-1 min-h-0');
  
  // Make sure DealSecX root wrappers use flex:
  content = content.replace(/<div id=['"]bottom['"]>/g, '<div id="bottom" className="flex-1 flex flex-col min-h-0 overflow-hidden">');
  content = content.replace(/<div id=['"]top['"]>/g, '<div id="top" className="shrink-0">');
  
  content = content.replace(
    /return \(\s*<div>\s*<div id=['"]top/g, 
    'return (\n    <div className="flex flex-col flex-1 min-h-0 w-full h-full overflow-hidden">\n      <div id="top'
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed', path.basename(file));
  }
});
