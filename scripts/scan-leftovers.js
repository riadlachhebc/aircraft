const fs = require('fs');
const path = require('path');

const terms = [
  'marcus-vance', 'Marcus Vance',
  'elena-rostova', 'Elena Rostova',
  'david-chen', 'David Chen',
  'how-to-choose-portable-air-conditioner-room-size',
  'single-hose-vs-dual-hose',
  'midea-duo-12000-btu',
  'vornado-660',
  'coway-airmega',
  'delonghi-dragon4',
  'dreo-nomad',
  'levoit-core'
];

let foundCount = 0;

function scan(dir) {
  fs.readdirSync(dir).forEach(file => {
    if (['node_modules', '.next', '.git'].includes(file)) return;
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) scan(full);
    else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.mjs') || file.endsWith('.js') || file.endsWith('.json')) {
      const content = fs.readFileSync(full, 'utf8');
      terms.forEach(t => {
        if (content.includes(t)) {
          console.log('Found "' + t + '" in ' + full);
          foundCount++;
        }
      });
    }
  });
}

scan('.');
console.log('Scan completed. Total demo references found:', foundCount);
