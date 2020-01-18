
const { version } = require('./package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

const file = resolve(__dirname, 'src', 'environments', 'version.ts');
writeFileSync(file,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
export const VERSION = ${JSON.stringify({ version }, null, 4)};
`, { encoding: 'utf-8' });

console.info(`Version ${ version } written to ${relative(__dirname, file)}`)
