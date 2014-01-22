// Open options.html upon new install or update
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == "install" || details.reason == "update") {
    chrome.tabs.create({ url: "options.html" });
  }
});