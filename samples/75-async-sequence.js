async function fetchSequentially(urls) {
  const data = []
  for (const url of urls) {
    const res = await fetch(url);
    const text = await res.text();
    data.push(text)
  }
  return data
}
