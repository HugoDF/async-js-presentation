async function forgotToWait() {
  try {
    const res = fetch('https://jsonplaceholer.typicode.com/todos/2')
    const text = res.text()
  } catch (e) {
    console.log(e);
  }
}

forgotToWait()
// TypeError: res.text is not a function
