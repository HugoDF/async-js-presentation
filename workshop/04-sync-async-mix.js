const fs = require('fs').promises
const path = require('path')

const browsers = ['chrome', 'edge', 'firefox', 'safari']

async function loadBrowserData(name) {
  const data = await fs.readFile(path.resolve(__dirname, './04-data', `${name}.json`), 'utf8');
  return JSON.parse(data)
}

async function badIdea(text) {
  let newText = text
  browsers.forEach((browser) => {
    newText = newText.replace(browser, async (match) => {
      const {
        builtBy,
        latestVersion,
        lastYearUsage
      } = await loadBrowserData(browser);
      return `${browser} (${builtBy}, latest version: ${latestVersion}, usage: ${lastYearUsage})`
    })
  })
  return newText
}

async function betterIdea(text) {
  const browserNameDataPairs = await Promise.all(
    browsers.map(
      async (browser) => [ browser, await loadBrowserData(browser) ]
    )
  );
  const browserToData = browserNameDataPairs.reduce((acc, [name, data]) => {
    acc[name] = data
    return acc
  }, {})

  let newText = text

  browsers.forEach((browser) => {
    newText = newText.replace(browser, () => {
      const {
        builtBy,
        latestVersion,
        lastYearUsage
      } = browserToData[browser];
      return `${browser} (${builtBy}, latest version: ${latestVersion}, usage: ${lastYearUsage})`
    })
  })

  return newText
}


// This would be coming from another module

const myText = `
We love chrome and firefox.

Despite their low usage, we also <3 safari and edge.
`;

(async () => {
  console.log(await badIdea(myText));
  console.log(await betterIdea(myText))
})()
