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

  // Kill all pixel-based height constraints that ruin flex scaling on these columns
  content = content.replace(/\bh-\[520px\]/g, '');
  content = content.replace(/\bh-\[540px\]/g, '');
  content = content.replace(/\blg:h-\[610px\]/g, '');
  content = content.replace(/\blg:h-\[640px\]/g, '');
  content = content.replace(/\bxl:min-h-\[85vh\]/g, '');
  content = content.replace(/\bmin-h-\[85vh\]/g, '');
  content = content.replace(/\bh-auto/g, ''); // Be careful with this, but inside classNames it's usually harmless or good to remove for flex items

  // Clean up double spaces left by removal
  content = content.replace(/  +/g, ' ');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed Heights', path.basename(file));
  }
});
