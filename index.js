const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'playingwe.play.hosting', // Change to your server IP
        port: 25565,                         // Change to your server port if needed
        username: '247_Bot',                 // Your bot's in-game name
        version: '1.21.11'                    // Change to match your server version
    });

    bot.on('spawn', () => {
        console.log('Bot has successfully joined the server!');
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`${username}: ${message}`);
    });

    // Auto-reconnect system if kicked or server restarts
    bot.on('end', (reason) => {
        console.log(`Disconnected: ${reason}. Reconnecting in 10 seconds...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('Error:', err));
}

// Start a basic web server so hosting sites know the bot is alive
const http = require('http');
http.createServer((req, res) => {
    res.write("Bot is running!");
    res.end();
}).listen(process.env.PORT || 3000);

createBot();
