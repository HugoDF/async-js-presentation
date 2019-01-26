async function withErrorHandling(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data
  } catch(e) {
    console.log(e.stack)
  }
}

withErrorHandling(
  'https://jsonplaceholer.typicode.com/todos/2'
  // The domain should be jsonplaceholder.typicode.com
).then(() => { /* but we'll end up here */ })
