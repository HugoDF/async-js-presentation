
(async () => {
  console.log('Immediately invoked function expressions (IIFEs) are cool again')
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/2')
  const data = await res.json()
  console.log(data)
})()

// SyntaxError: await is only valid in async function
const res = await fetch(
  'https://jsonplaceholder.typicode.com/todos/2'
)
