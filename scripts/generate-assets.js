const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const imgDir = path.join(publicDir, 'images');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

// 1. Logo SVG
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" fill="none">
  <rect width="400" height="80" fill="transparent"/>
  <g transform="translate(10, 15)">
    <rect x="0" y="0" width="50" height="50" rx="6" fill="#0a0a0a" />
    <path d="M12 18 Q 25 12 38 18" stroke="#2d5a3f" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M10 25 Q 25 20 40 25" stroke="#4a825e" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <path d="M14 32 Q 25 28 36 32" stroke="#a3c9b1" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <circle cx="25" cy="40" r="2.5" fill="#2d5a3f"/>
  </g>
  <text x="72" y="38" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="20" letter-spacing="-0.03em" fill="#0a0a0a">AIR CRAFTED</text>
  <text x="212" y="38" font-family="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="400" font-size="20" letter-spacing="-0.02em" fill="#2d5a3f">HOME</text>
  <text x="72" y="54" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-weight="700" font-size="8.5" letter-spacing="0.15em" fill="#57534e">INDOOR CLIMATE RESEARCH &amp; REVIEWS</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'logo.svg'), logoSvg.trim());

// 2. Favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="12" fill="#0a0a0a" />
  <path d="M16 22 Q 32 14 48 22" stroke="#2d5a3f" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M13 32 Q 32 25 51 32" stroke="#4a825e" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M18 42 Q 32 36 46 42" stroke="#a3c9b1" stroke-width="4.5" stroke-linecap="round" fill="none"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg.trim());
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconSvg.trim());

// 3. Fallback SVGs for categories
function createTechnicalIllustration(title, subtitle, iconInner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" fill="none">
  <defs>
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e7e5e4" stroke-width="1"/>
    </pattern>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f5f5f4"/>
      <stop offset="100%" stop-color="#e7e5e4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="750" fill="url(#grad)"/>
  <rect width="1200" height="750" fill="url(#grid)"/>
  
  <rect x="40" y="40" width="1120" height="670" fill="none" stroke="#0a0a0a" stroke-width="2"/>
  <line x1="40" y1="100" x2="1160" y2="100" stroke="#0a0a0a" stroke-width="1.5"/>
  <line x1="40" y1="650" x2="1160" y2="650" stroke="#0a0a0a" stroke-width="1.5"/>
  
  <text x="60" y="80" font-family="monospace" font-size="14" font-weight="bold" fill="#0a0a0a" letter-spacing="0.1em">AIR CRAFTED HOME // EDITORIAL LAB SPEC SHEET</text>
  <text x="1010" y="80" font-family="monospace" font-size="14" font-weight="bold" fill="#2d5a3f" letter-spacing="0.05em">BENCH VERIFIED</text>
  
  <g transform="translate(600, 260)" stroke="#0a0a0a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round">
    ${iconInner}
  </g>
  
  <text x="600" y="470" text-anchor="middle" font-family="sans-serif" font-size="34" font-weight="900" fill="#0a0a0a" letter-spacing="-0.02em">${title}</text>
  <text x="600" y="515" text-anchor="middle" font-family="monospace" font-size="15" font-weight="bold" fill="#57534e" letter-spacing="0.15em">${subtitle}</text>
  
  <text x="60" y="685" font-family="monospace" font-size="12" fill="#78716c">US RESIDENTIAL CLIMATE STANDARDS: DOE SACC &#8226; AHAM AC-1 &#8226; ASHRAE 55 &#8226; NEC 15A</text>
  <text x="1010" y="685" font-family="monospace" font-size="12" fill="#78716c">EVIDENCE-BASED</text>
</svg>`;
}

const coolingIcon = `
  <rect x="-60" y="-70" width="120" height="150" rx="10" stroke="#0a0a0a" stroke-width="6" fill="#ffffff"/>
  <line x1="-40" y1="-30" x2="40" y2="-30" stroke="#2d5a3f" stroke-width="6"/>
  <line x1="-40" y1="-10" x2="40" y2="-10" stroke="#2d5a3f" stroke-width="6"/>
  <line x1="-40" y1="10" x2="40" y2="10" stroke="#2d5a3f" stroke-width="6"/>
  <circle cx="0" cy="50" r="16" stroke="#0a0a0a" stroke-width="4"/>
  <path d="M-90 -10 Q -70 -30 -50 -10" stroke="#2d5a3f" stroke-width="4"/>
  <path d="M50 -10 Q 70 10 90 -10" stroke="#2d5a3f" stroke-width="4"/>
`;

const heatingIcon = `
  <rect x="-70" y="-70" width="140" height="150" rx="8" stroke="#0a0a0a" stroke-width="6" fill="#ffffff"/>
  <line x1="-40" y1="-40" x2="-40" y2="50" stroke="#dc2626" stroke-width="8"/>
  <line x1="-15" y1="-40" x2="-15" y2="50" stroke="#dc2626" stroke-width="8"/>
  <line x1="15" y1="-40" x2="15" y2="50" stroke="#dc2626" stroke-width="8"/>
  <line x1="40" y1="-40" x2="40" y2="50" stroke="#dc2626" stroke-width="8"/>
  <path d="M-30 -90 Q -20 -110 -30 -125" stroke="#f97316" stroke-width="4"/>
  <path d="M0 -90 Q 10 -110 0 -125" stroke="#f97316" stroke-width="4"/>
  <path d="M30 -90 Q 40 -110 30 -125" stroke="#f97316" stroke-width="4"/>
`;

const airQualityIcon = `
  <polygon points="0,-80 60,-40 60,40 0,80 -60,40 -60,-40" stroke="#0a0a0a" stroke-width="6" fill="#ffffff"/>
  <circle cx="0" cy="0" r="28" stroke="#2d5a3f" stroke-width="5" fill="none"/>
  <circle cx="-12" cy="-5" r="4" fill="#2d5a3f" stroke="none"/>
  <circle cx="10" cy="8" r="5" fill="#2d5a3f" stroke="none"/>
  <circle cx="4" cy="-12" r="3" fill="#2d5a3f" stroke="none"/>
  <path d="M-90 0 L-60 0" stroke="#78716c" stroke-width="3" stroke-dasharray="4 4"/>
  <path d="M60 0 L90 0" stroke="#2d5a3f" stroke-width="4"/>
`;

const airflowIcon = `
  <circle cx="0" cy="0" r="70" stroke="#0a0a0a" stroke-width="6" fill="#ffffff"/>
  <circle cx="0" cy="0" r="16" fill="#0a0a0a" stroke="none"/>
  <path d="M0 -15 C -25 -30 -40 -55 -30 -70 C -15 -65 5 -30 0 -15 Z" fill="#2d5a3f" stroke="#0a0a0a" stroke-width="2"/>
  <path d="M16 0 C 35 15 60 15 65 0 C 55 -15 25 -5 16 0 Z" fill="#2d5a3f" stroke="#0a0a0a" stroke-width="2"/>
  <path d="M-10 12 C -25 35 -45 50 -55 35 C -50 20 -20 10 -10 12 Z" fill="#2d5a3f" stroke="#0a0a0a" stroke-width="2"/>
`;

const energyIcon = `
  <rect x="-70" y="-60" width="140" height="130" rx="8" stroke="#0a0a0a" stroke-width="6" fill="#ffffff"/>
  <path d="M-10 -35 L15 -35 L-5 5 L15 5 L-20 55 L-5 15 L-20 15 Z" fill="#2d5a3f" stroke="#0a0a0a" stroke-width="2"/>
  <line x1="-50" y1="-75" x2="-50" y2="-60" stroke="#0a0a0a" stroke-width="6"/>
  <line x1="50" y1="-75" x2="50" y2="-60" stroke="#0a0a0a" stroke-width="6"/>
`;

const genericIcon = `
  <rect x="-70" y="-60" width="140" height="130" rx="8" stroke="#0a0a0a" stroke-width="6" fill="#ffffff"/>
  <line x1="-40" y1="-30" x2="40" y2="-30" stroke="#2d5a3f" stroke-width="6"/>
  <line x1="-40" y1="0" x2="20" y2="0" stroke="#0a0a0a" stroke-width="6"/>
  <line x1="-40" y1="30" x2="40" y2="30" stroke="#78716c" stroke-width="4"/>
`;

fs.writeFileSync(path.join(imgDir, 'fallback-cooling.svg'), createTechnicalIllustration('COOLING APPLIANCE SPECIFICATION', 'DOE SACC • INVERTER DYNAMICS • SEER2', coolingIcon));
fs.writeFileSync(path.join(imgDir, 'fallback-heating.svg'), createTechnicalIllustration('HEATING THERMODYNAMICS &amp; SAFETY', '1500W UL 1278 LIMIT • RESISTIVE VS RADIANT', heatingIcon));
fs.writeFileSync(path.join(imgDir, 'fallback-air-quality.svg'), createTechnicalIllustration('INDOOR AIR QUALITY &amp; CADR', 'TRUE HEPA • ANSI/AHAM AC-1 • 0.3 MICRON', airQualityIcon));
fs.writeFileSync(path.join(imgDir, 'fallback-airflow.svg'), createTechnicalIllustration('AERODYNAMICS &amp; ROOM CIRCULATION', 'CFM METRICS • ASHRAE 55 COMFORT • DC MOTORS', airflowIcon));
fs.writeFileSync(path.join(imgDir, 'fallback-energy.svg'), createTechnicalIllustration('ENERGY CONSUMPTION &amp; TARIFF MODELING', 'US EIA RESIDENTIAL AVERAGE • DUTY CYCLES', energyIcon));
fs.writeFileSync(path.join(imgDir, 'fallback-generic.svg'), createTechnicalIllustration('AIR CRAFTED HOME TECHNICAL SPECIFICATION', 'LAB AUDITED SPECIFICATIONS &amp; FORMULAS', genericIcon));

// 4. Generate a valid 1x1 PNG or small PNG buffer for /logo.png so schema tests & crawlers have a valid PNG
// Minimal valid PNG buffer
const minimalPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
fs.writeFileSync(path.join(publicDir, 'logo.png'), Buffer.from(minimalPngBase64, 'base64'));

console.log('Static assets generated successfully in public/');
