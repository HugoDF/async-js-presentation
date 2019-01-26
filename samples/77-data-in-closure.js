async function findLinks() { /* someimplementation */ }

async function crawl(url, parentText) {
  console.log('crawling links in: ', parentText);
  const res = await fetch(url);
  const text = await res.text();
  const links = await findLinks(text);
  return crawl(links, text);
}

