document.addEventListener('DOMContentLoaded', () => {
  const siteInput = document.getElementById("siteInput");
  const addBtn = document.getElementById("addBtn");
  const siteList = document.getElementById("siteList");
  const focusToggle = document.getElementById("focusToggle");

  // Load data
  chrome.storage.local.get(["blacklist", "focusMode"], (data) => {
    focusToggle.checked = !!data.focusMode;
    renderSites(data.blacklist || []);
  });

  addBtn.onclick = () => {
    const site = siteInput.value.trim().toLowerCase();
    if (site) {
      chrome.storage.local.get(["blacklist"], (data) => {
        const list = data.blacklist || [];
        if (!list.includes(site)) {
          list.push(site);
          chrome.storage.local.set({ blacklist: list }, () => {
            renderSites(list);
            siteInput.value = "";
          });
        }
      });
    }
  };

  focusToggle.onchange = () => {
    chrome.storage.local.set({ focusMode: focusToggle.checked });
  };

  function renderSites(sites) {
    siteList.innerHTML = "";
    sites.forEach((site, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${site}</span><button class="remove-btn" data-index="${index}">X</button>`;
      siteList.appendChild(li);
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.onclick = (e) => {
        const idx = e.target.getAttribute('data-index');
        sites.splice(idx, 1);
        chrome.storage.local.set({ blacklist: sites }, () => renderSites(sites));
      };
    });
  }
});