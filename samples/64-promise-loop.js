function fetchSequentially(urls) {
  const [ url, ...rest ] = urls
  fetch(url)
    .then(res => res.text())
    .then(text => console.log(text.slice(0, 100)))
    .then(fetchSequentially(rest));
}
