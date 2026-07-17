const fs = require('fs');
const path = require('path');

const dir = 'Frontend/src/Pages/UserPages/ProfilePages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx')).map(f => path.join(dir, f));

const target = "className='bg-gray-100 min-h-screen lg:relative fixed inset-0 flex flex-col overflow-hidden'";
const replacement = "className='bg-gray-100 h-[calc(100dvh-60px)] lg:h-screen lg:relative fixed inset-0 flex flex-col overflow-hidden'";

let count = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(file, content, 'utf8');
    count++;
  }
}
console.log('Replaced in ' + count + ' files');

