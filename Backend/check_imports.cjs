const fs = require('fs');
const path = require('path');

function checkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
            checkDir(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const importRegex = /import\s+.*?from\s+['"](.*?)['"]/g;
            let match;
            while ((match = importRegex.exec(content)) !== null) {
                const importPath = match[1];
                if (importPath.startsWith('.')) {
                    const resolvedPath = path.resolve(dir, importPath);
                    const dirName = path.dirname(resolvedPath);
                    const baseName = path.basename(resolvedPath);
                    if (fs.existsSync(dirName)) {
                        const actualFiles = fs.readdirSync(dirName);
                        if (!actualFiles.includes(baseName)) {
                            // Maybe it's a directory import?
                            if (actualFiles.includes(baseName + '.js') || actualFiles.includes(baseName + '/index.js')) {
                               // ignore
                            } else {
                                console.log('CASE MISMATCH in ' + fullPath + ' -> ' + importPath);
                            }
                        }
                    } else {
                        console.log('DIR NOT FOUND in ' + fullPath + ' -> ' + importPath);
                    }
                }
            }
        }
    }
}
checkDir('.');
