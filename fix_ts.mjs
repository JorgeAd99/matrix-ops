import fs from 'fs';

let nav = fs.readFileSync('src/components/GlobalNav.tsx', 'utf8');
nav = nav.replace(/onMouseEnter=\{\(e\) => \{/g, "onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {");
nav = nav.replace(/onMouseLeave=\{\(e\) => \{/g, "onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {");
nav = nav.replace(/onMouseEnter=\{e => \{/g, "onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {");
nav = nav.replace(/onMouseLeave=\{e => \{/g, "onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {");
// Also add React import if needed
if (!nav.includes('import React')) {
  nav = "import React from 'react';\n" + nav;
}
fs.writeFileSync('src/components/GlobalNav.tsx', nav);

let graf = fs.readFileSync('src/routes/graficadora.tsx', 'utf8');
// Replace any remaining dynamic usage
graf = graf.replace(/import dynamic from 'next\/dynamic';?\r?\n?/g, "");
graf = graf.replace(/const Plot = dynamic\(\(\) => import\('react-plotly.js'\), \{ ssr: false \}\);/g, "const Plot = React.lazy(() => import('react-plotly.js'));");
if (!graf.includes('import React')) {
  graf = "import React, { Suspense } from 'react';\n" + graf;
}
// Wrap Plot with Suspense
graf = graf.replace(/<Plot/g, "<Suspense fallback={<div>Cargando graficadora...</div>}><Plot");
graf = graf.replace(/<\/Plot>/g, "</Plot></Suspense>");
fs.writeFileSync('src/routes/graficadora.tsx', graf);

console.log('Fixed TS errors');
