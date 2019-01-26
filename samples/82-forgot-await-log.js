async function forgotToWait() {
  const res = fetch('https://jsonplaceholer.typicode.com/todos/2')
  console.log(res)
}

forgotToWait()
// Promise { <pending> }
