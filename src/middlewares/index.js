import fs from 'fs';
const array = [];

fs
  .readdirSync(__dirname)
  .filter(file => ((file.indexOf('.') !== 0) && (file !== 'index.js')))
  .forEach(file => {
    const middlewareItem = require('./' + file).default; // eslint-disable-line
    array.push(middlewareItem);
  });

export default array;
