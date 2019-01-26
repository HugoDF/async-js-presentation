async function fetchSequentially(urls) {
  for (const url of urls) {
    const res = await fetch(url);
    const text = await res.text();
    console.log(text.slice(0, 100));
  }
}
