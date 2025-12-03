import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

fs.copyFileSync(
  path.join(distDir, 'index.html'),
  path.join(distDir, '404.html')
);
console.log('✅ 404.html created for GitHub Pages routing');
