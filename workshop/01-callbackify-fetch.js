const fetch = require('node-fetch')

function get(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err))
}
