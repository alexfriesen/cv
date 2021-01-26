#!/usr/bin/env node
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');
const { version } = require('../package.json');

const content = `/* eslint-disable */
// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
export const VERSION = ${JSON.stringify({ version }, null, 4)};
`
const versionFilePath = resolve(__dirname, '..', 'src', 'environments', 'version.ts');
writeFileSync(versionFilePath, content, { encoding: 'utf-8' });

console.info(`Version ${version} written to ${relative(__dirname, versionFilePath)}`)
