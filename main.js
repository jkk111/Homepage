var loaded = false;
document.addEventListener("DOMContentLoaded", function(e, f, g) {
  if(loaded)
    return;
  loaded = true;
  e.stopPropagation();
  e.preventDefault();
  var links = document.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].setAttribute("target", "_blank");
  }
  var xhr = new XMLHttpRequest();
  xhr.open("get", "http://wordsmith.org/words/quote2.js", true);
  xhr.onload = function() {
    var text = this.responseText;
    text = text.substring(106)
    text = text.substring(0, text.length - 132);
    document.getElementById("quote").innerHTML = text;
  }
  xhr.send();
  chrome.storage.sync.get({
    links: []
  }, function(items) {
    var links = items.links;
    var linksEl = document.getElementById("links");
    for(var i = 0; i < links.length; i++) {
      var link = document.createElement("a");
      link.text = links[i].name;
      link.href = links[i].url;
      link.target = "_blank";
      linksEl.appendChild(link);
    }
  })
  document.getElementById("options").addEventListener("click", openOptions)
  return;
});

function openOptions() {
  chrome.runtime.openOptionsPage(function() {
    // location.reload();
  })
}