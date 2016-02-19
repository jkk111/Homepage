document.addEventListener('DOMContentLoaded', restore_options);
if(! chrome.storage) {
  chrome.storage = {};
  chrome.storage.sync = {};
}
if(!chrome.storage.sync.get) {
  chrome.storage.sync.get = function(data, cb) {
    cb(data);
  }
}
if(!chrome.storage.sync.set) {
  chrome.storage.sync.set = function(items) {
    console.log(items)
  }
}
var links;
var defaultLinks = [
  { url: "https://www.facebook.com", name: "Facebook"},
  { url: "https://www.twitter.com", name: "Twitter"},
  { url: "https://www.reddit.com", name: "Reddit"},
  { url: "https://www.youtube.com", name: "Youtube"},
  { url: "https://play.Spotify.com", name: "Spotify"},
  { url: "https://www.amazon.co.uk", name: "Amazon"},
  { url: "https://www.twitch.com", name: "Twitch"},
  { url: "https://mail.google.com", name: "GMail"},
  { url: "https://www.github.com", name: "Github"},
  { url: "https://news.ycombinator.com/", name: "Hacker News" }
]
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  console.log("starting")
  chrome.storage.sync.get({
    links: defaultLinks
  }, function(items) {
    links = items.links;
    var list = document.getElementById("links")
    for(var i = 0;i < links.length; i++) {
      var el = document.createElement("option");
      el.text = links[i].name;
      el.value = i;
      list.add(el);
    }
  });
  document.getElementById("save").addEventListener("click", save_options);
  document.getElementById("remove").addEventListener("click", remove_option);
  document.getElementById("linkAdd").addEventListener("click", addLink);
}

function save_options() {
  var newLinks = [];
  for(var i = 0 ; i < links.length; i++) {
    if(!links[i].removed) {
      newLinks.push(links[i]);
    }
  }
  chrome.storage.sync.set({links: defaultLinks}, function() {
    alert("saved");
  });
}

function addLink(e) {
  e.preventDefault();
  e.stopPropagation();
  var url = document.getElementById("url").value;
  var name = document.getElementById("name").value;
  var list = document.getElementById("links")
  var el = document.createElement("option");
  el.text = name;
  el.value = links.length;
  list.add(el);
  links.push({ url: url, name: name });
  return false;
}

function remove_option(e) {
  var index = document.getElementById("links").value;
  var listIndex = document.getElementById("links").selectedIndex;
  console.log(index);
  links[index].removed = true;
  document.getElementById("links").remove(listIndex);
}