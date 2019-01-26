function fetchParallel(urls) {
  return Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    })
  );
}
