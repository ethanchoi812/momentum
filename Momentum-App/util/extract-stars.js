'use strict';
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const BASE = path.join(__dirname, '..', 'src', 'styles');
const filenames = ['three-stars.svg', 'two-stars.svg', 'one-star.svg'];
let xmls;
console.log('Extracting three-stars.svg, two-stars.svg, one-star.svg...');
try {
  xmls = filenames
    .map(fn => path.join(BASE, fn))
    .map(filepath => fs.readFileSync(filepath, 'utf-8'));
} catch (e) {
  console.log('Fail to extract star!');
  throw e;
}

const stars = xmls
  .map(xml => cheerio.load(xml, { xmlMode: true }))
  .map($ => $('path').toArray())
  .map(els => els
    .map(el => cheerio(el))
    .map(el => ({ d: el.attr('d') }))
  );

const OUTPUT = path.join(
  __dirname,
  '..',
  'src',
  'components',
  'todays-focus',
  'stars-data.json'
);
fs.writeFileSync(OUTPUT, JSON.stringify(stars));
console.log('OK\n');

