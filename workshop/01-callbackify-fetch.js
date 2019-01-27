const fetch = require('node-fetch')

function get(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err))
}

get('https://jsonplaceholder.typicode.com/todos', (err, data) => {
  console.log(data)
})
