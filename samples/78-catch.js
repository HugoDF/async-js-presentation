function withCatch() {
  return fetch('borked_url')
    .then(res => res.text())
    .catch(err => console.log(err))
}

async function withBlock() {
  try {
    const res = await fetch('borked_url');
    const text = await res.text();
  } catch (err) {
    console.log(err)
  }
}
