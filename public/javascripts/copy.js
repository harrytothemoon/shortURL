function copy() {
  alert('The URL has been copied to the clipboard!')
}

var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function (e) {
  console.log(e);
});

clipboard.on('error', function (e) {
  console.log(e);
});