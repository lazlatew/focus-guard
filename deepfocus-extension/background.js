chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    chrome.storage.local.get(["blacklist", "focusMode"], (data) => {
      if (data.focusMode && data.blacklist) {
        const isBlocked = data.blacklist.some(site => tab.url.toLowerCase().includes(site));
        if (isBlocked) {
          chrome.tabs.update(tabId, { url: chrome.runtime.getURL("warning.html") });
        }
      }
    });
  }
});