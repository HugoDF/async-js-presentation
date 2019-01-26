function fetchSequentially(urls, data = []) {
  if (urls.length === 0) return data
  const [url, ...rest] = urls
  return fetch(url)
    .then(res => res.text())
    .then(text =>
      fetchSequentially(
        rest,
        [...data, text]
      ));
}


