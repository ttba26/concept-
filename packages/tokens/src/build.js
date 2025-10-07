const fs = require('fs');
const path = require('path');

// Simple build script to flatten design tokens into CSS custom properties
function buildCSSVariables(tokens, prefix = '') {
  let css = '';
  for (const [key, value] of Object.entries(tokens)) {
    const name = prefix ? `${prefix}-${key}` : key;
    if (value && typeof value === 'object' && !('value' in value)) {
      css += buildCSSVariables(value, name);
    } else if (value && typeof value === 'object' && 'value' in value) {
      css += `  --${name}: ${value.value};\n`;
    }
  }
  return css;
}

function build() {
  const tokensPath = path.resolve(__dirname, 'design-tokens.json');
  const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
  const cssVariables = buildCSSVariables(tokens);
  const output = `:root {\n${cssVariables}}\n`;

  const outputDir = path.resolve(__dirname, '..', '..', 'dist');
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'tokens.css'), output);
  console.log('Design tokens built successfully.');
}

build();
