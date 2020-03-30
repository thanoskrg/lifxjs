const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../index.d.ts');
const destination = path.join(__dirname, '../dist/index.d.ts');

fs.copyFileSync(source, destination);