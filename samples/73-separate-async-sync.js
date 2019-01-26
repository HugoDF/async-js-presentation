const fs = require('fs').promises

const fetchFile = () =>
  fs.readFile('path', 'utf-8');
const replaceAllThings = (text) =>
  text.replace(/a/g, 'b');
const writeFile = (text) =>
  fs.writeFile('path', text, 'utf-8');

(async () => {
  const text = await fetchFile();
  const newText = replaceAllThings(text);
  await writeFile(newText);
})();
