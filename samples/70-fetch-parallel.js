function fetchParallel(urls) {
  return Promise.all(
    urls.map(
      (url) =>
      fetch(url).then(res => res.json())
    )
  );
}
