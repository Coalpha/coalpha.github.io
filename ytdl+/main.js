const ytdl = require('ytdl-core');
b.onclick=te;
const i = document.getElementById('i');
function te() {
  Array.from(document.getElementsByTagName('a')).forEach(a=>a.parentNode.removeChild(a));
  ytdl.getInfo(t.value, {}, init);
}
function init(e, info) {
  const formats = info.formats;
  formats.forEach(format => {
    const t = `${format.container} using ${format.encoding} with quality ${format.quality} | ${format.resolution} :: audio @ ${format.audioBitrate} using ${format.audioEncoding}`;
    const a = document.createElement('a');
    a.onclick = location = format.url;
    a.innerText = t;
    document.body.appendChild(a);
  });
}
const lp = url => () => {
  phetch(url).then(_ => i.contentDocument.write(_));
}
function phetch(url) {
  return fetch('http://cors-anywhere.herokuapp.com/' + url).then(_ => _.text());
}