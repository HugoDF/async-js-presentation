const fetch = require('node-fetch')

function get(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err))
}

const baseUrl = 'https://jsonplaceholder.typicode.com/todos'

function getTodosCallback(ids, callback) {
  const output = []
  const expectedLength = ids.length

  ids.forEach(id => {
    get(`${baseUrl}/${id}`, (err, data) => {
      if (err) callback(err)

      output.push(data)

      if (output.length === expectedLength) {
        callback(null, output)
      }
    })
  })
}

function getTodosPromise(ids) {
  return Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`${baseUrl}/${id}`);
      const data = await res.json();
      return data;
    })
  )
}

getTodosCallback([1, 2, 3, 10, 22], (err, data) => {
  if (err) return console.log(err)
  console.log(data)
})

getTodosPromise([1, 2, 3, 10, 22]).then(console.log).catch(console.log)
