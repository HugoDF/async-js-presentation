async function asyncThrow() {
  throw new Error('asyncThrow');
}
function rejects() {
  return Promise.reject(new Error('rejects'))
}
async function swallowError(fn) {
  try { await asyncThrow() }
  catch (e) { console.log(e.message, e.__proto__) }
  try { await rejects() }
  catch (e) { console.log(e.message, e.__proto__) }
}
swallowError() // asyncThrow Error {} rejects Error {}

