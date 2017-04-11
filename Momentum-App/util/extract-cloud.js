'use strict';
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const CLOUD = path.join(__dirname, '..', 'src', 'styles', 'cloud.svg');
let xml;
console.log('Extracting cloud.svg...');
try {
  xml = fs.readFileSync(CLOUD, 'utf-8');
} catch (e) {
  console.log('Fail to extract cloud!');
  throw e;
}

const $ = cheerio.load(xml, { xmlMode: true });
const d = $('path').attr('d');
const viewBox = $('svg').attr('viewBox');

const OUTPUT = path.join(
  __dirname,
  '..',
  'src',
  'components',
  'todays-focus',
  'cloud-data.json'
);
fs.writeFileSync(OUTPUT, JSON.stringify({ d, viewBox }));
console.log('OK\n');

