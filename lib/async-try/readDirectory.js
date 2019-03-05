"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walkInDirectory = exports.readDirectory = void 0;

var _path = require("../controller/path.js");

const fs = require('fs');

const path = require('path');

const readDirectory = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      }

      resolve(files);
    });
  });
};

exports.readDirectory = readDirectory;
let arrOfFiles = [];

const walkInDirectory = route => {
  readDirectory(route).then(content => {
    content.forEach(file => {
      // console.log(file)
      const routeAbsFile = path.join(route, file); // console.log(routeAbsFile)

      const stat = fs.statSync(routeAbsFile);

      if (stat.isDirectory()) {
        readDirectory(routeAbsFile).then(archivos => archivos.forEach(a => walkInDirectory(path.join(routeAbsFile, a)))).catch(err => console.log(err));
      } else if (stat.isFile()) {
        arrOfFiles.push(routeAbsFile);
      }
    });
  }).catch(err => console.log(err));
  setTimeout(() => console.log(arrOfFiles), 2000); // return arrOfFiles;
}; // const aa = readDirectory(arr);
// console.log(aa);
// .forEach(files, index => {
//     const stat = fs.stat();
//     if(stat.isDirectory()) {
//         arrOfFiles = arrOfFiles.concat(walkInDirectory('nuevo directory')) 
//     }
//     else if (stat.isFile()) {
//         arrOfFiles.push(files);
//     } 
// });


exports.walkInDirectory = walkInDirectory;
walkInDirectory('C:\\Users\\CINTHYA\\Documents\\md-links\\LIM008-fe-md-links\\test'); // readDirectory('./test/testing')
// // .then(file => console.log(file))     
// .then(file => {
//     const resultfilterMdFiles = filterMdFiles(file)
//     resultfilterMdFiles.forEach(element => {
//         console.log(joinPath(element))
//     });
// }).catch(err => console.log(err))