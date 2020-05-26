function copy() {
  document.getElementById("custom-tooltip").style.display = "inline";
  setTimeout(function () {
    document.getElementById("custom-tooltip").style.display = "none";
  }, 1000);
}


var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function (e) {
  console.log(e);
});

clipboard.on('error', function (e) {
  console.log(e);
});