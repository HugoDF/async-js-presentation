async function findLinks() { /* some implementation */ }

function crawl(url, parentText) {
  console.log('crawling links in: ', parentText);
  return fetch(url)
    .then(res => res.text())
    .then(text => Promise.all([
      findLinks(text),
      text
    ]))
    .then(([links, text]) => Promise.all(
      links.map(link => crawl(link, text))
    ));
}

