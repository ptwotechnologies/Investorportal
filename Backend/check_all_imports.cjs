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
                    let resolvedPath = path.resolve(dir, importPath);
                    let dirName = path.dirname(resolvedPath);
                    let baseName = path.basename(resolvedPath);
                    
                    if (fs.existsSync(dirName)) {
                        const actualFiles = fs.readdirSync(dirName);
                        let found = false;
                        if (actualFiles.includes(baseName)) found = true;
                        if (!found && actualFiles.includes(baseName + '.js')) found = true;
                        if (!found && actualFiles.includes(baseName + '.jsx')) found = true;
                        if (!found && actualFiles.includes(baseName + '.cjs')) found = true;
                        
                        // Check if directory
                        if (!found) {
                            try {
                                if (fs.statSync(resolvedPath).isDirectory()) {
                                    const subFiles = fs.readdirSync(resolvedPath);
                                    if (subFiles.includes('index.js')) found = true;
                                }
                            } catch (e) {}
                        }
                        
                        if (!found) {
                            console.log('MISSING OR CASE MISMATCH: ' + fullPath + ' -> ' + importPath);
                        }
                    } else {
                        console.log('DIR NOT FOUND: ' + fullPath + ' -> ' + importPath);
                    }
                }
            }
        }
    }
}
checkDir('.');
