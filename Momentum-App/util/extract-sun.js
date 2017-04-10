'use strict';
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const SUN = path.join(__dirname, '..', 'src', 'styles', 'sun.svg');
let xml;
console.log('Extracting sun.svg...');
try {
  xml = fs.readFileSync(SUN, 'utf-8');
} catch(e) {
  console.error('Fail to extract sun!');
  throw e;
}

const $ = cheerio.load(xml, { xmlMode: true });
const d = $('path').attr('d');
const $ellipse = $('ellipse');
const cx = $ellipse.attr('cx');
const cy = $ellipse.attr('cy');
const rx = $ellipse.attr('rx');
const ry = $ellipse.attr('ry');

const OUTPUT = path.join(
  __dirname,
  '..',
  'src',
  'components',
  'todays-focus',
  'sun-data.json'
);
fs.writeFileSync(OUTPUT, JSON.stringify({ d, cx, cy, rx, ry }));
console.log('OK\n');

