const fs = require('fs')

function readFile(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, text) => {
      if (err) return reject(err)
      resolve(text)
    })
  })
}

readFile('./01-callbackify-fetch.js', 'utf8')
  .then(console.log)
