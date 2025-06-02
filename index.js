const cluster = require('cluster');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const express = require('express');
const app = express();

// Express.js
const ports = [4000, 3000, 5000, 8000];
let availablePortIndex = 0;

// Function to send startup message to bot owner
async function sendStartupMessage(conn, forceMessage = false) {
  if (!conn || !conn.user) return false;

  // Initialize the global flag if it doesn't exist
  if (typeof global.startupMessageSent === 'undefined') {
    global.startupMessageSent = false;
  }

  // Skip if already sent (unless forced)
  if (global.startupMessageSent && !forceMessage) {
    console.log('\x1b[33m%s\x1b[0m', '⚠️ Startup message already sent, skipping...');
    return false;
  }

  try {
    // Set the global flag to prevent duplicate messages
    if (!forceMessage) {
      global.startupMessageSent = true;
    }

    // Bot's own JID
    const botNumber = conn.user.jid;

    // Current date and time formatted
    const now = new Date().toLocaleString();

    // Get system information
    const systemInfo = {
      platform: os.type(),
      version: os.release(),
      arch: os.arch(),
      totalRAM: (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
      freeRAM: (os.freemem() / (1024 * 1024 * 1024)).toFixed(2) + ' GB',
      uptime: formatUptime(os.uptime())
    };

    // Create the startup message
    const startupMessage = `
┌─⊷ *BOT STARTUP* ⊶
│
│ 🤖 *Bot is now online!*
│ ⏰ ${now}
│
│ 💻 *System Info:*
│ • Platform: ${systemInfo.platform}
│ • Version: ${systemInfo.version}
│ • Architecture: ${systemInfo.arch}
│ • Total RAM: ${systemInfo.totalRAM}
│ • Free RAM: ${systemInfo.freeRAM}
│ • Uptime: ${systemInfo.uptime}
│
└───────────────────────
`.trim();

    // Send the message to the bot's own number (will appear in saved messages)
    await conn.sendMessage(botNumber, { text: startupMessage });
    console.log('\x1b[32m%s\x1b[0m', '✅ Startup message sent to bot');
    return true;
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', `❌ Error sending startup message: ${err}`);
    return false;
  }
}

// Helper function to format uptime
function formatUptime(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

function checkPort(port) {
  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      server.close();
      resolve(true);
    });
    server.on('error', reject);
  });
}

async function startServer() {
  const port = ports[availablePortIndex];
  const isPortAvailable = await checkPort(port);

  if (isPortAvailable) {
    console.log('\x1b[33m%s\x1b[0m', `🌐 Port ${port} is open`);
    app.get('/', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      const data = {
        status: 'true',
        message: 'Bot Successfully Activated!',
        author: 'BLACKSKY-MD'
      };
      const result = {
        response: data
      };
      res.send(JSON.stringify(result, null, 2));
    });
  } else {
    console.log(`Port ${port} is already in use. Trying another port...`);
    availablePortIndex++;

    if (availablePortIndex >= ports.length) {
      console.log('No more available ports. Exiting...');
      process.exit(1);
    } else {
      ports[availablePortIndex] = parseInt(port) + 1;
      startServer();
    }
  }
}

startServer();

// Export the sendStartupMessage function globally so it can be called from main.js
global.sendStartupMessage = sendStartupMessage;

let isRunning = false;

function start(file) {
  if (isRunning) return;
  isRunning = true;

  const args = [path.join(__dirname, file), ...process.argv.slice(2)];
  const p = spawn(process.argv[0], args, {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  });

  p.on("message", (data) => {
    console.log('\x1b[36m%s\x1b[0m', `🟢 RECEIVED ${data}`);
    switch (data) {
      case "reset":
        p.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case "uptime":
        p.send(process.uptime());
        break;
    }
  });

  p.on("exit", (code) => {
    isRunning = false;
    console.error('\x1b[31m%s\x1b[0m', `Exited with code: ${code}`);
    start('main.js');

    if (code === 0) return;

    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0]);
      console.error('\x1b[31m%s\x1b[0m', `File ${args[0]} has been modified. Script will restart...`);
      start("main.js");
    });
  });

  p.on("error", (err) => {
    console.error('\x1b[31m%s\x1b[0m', `Error: ${err}`);
    p.kill();
    isRunning = false;
    console.error('\x1b[31m%s\x1b[0m', `Error occurred. Script will restart...`);
    start("main.js");
  });

  const pluginsFolder = path.join(__dirname, "plugins");

  fs.readdir(pluginsFolder, (err, files) => {
    if (err) {
      console.error('\x1b[31m%s\x1b[0m', `Error reading plugins folder: ${err}`);
      return;
    }
    console.log('\x1b[33m%s\x1b[0m', `🟡 Found ${files.length} plugins in folder ${pluginsFolder}`);
    try {
      require.resolve('@adiwajshing/baileys');
      console.log('\x1b[33m%s\x1b[0m', `🟡 Baileys library version ${require('@adiwajshing/baileys/package.json').version} is installed`);
    } catch (e) {
      console.error('\x1b[31m%s\x1b[0m', `❌ Baileys library is not installed`);
    }
  });

  console.log(`🖥️ \x1b[33m${os.type()}\x1b[0m, \x1b[33m${os.release()}\x1b[0m - \x1b[33m${os.arch()}\x1b[0m`);
  const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
  console.log(`💾 \x1b[33mTotal RAM: ${ramInGB.toFixed(2)} GB\x1b[0m`);
  const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);
  console.log(`💽 \x1b[33mFree RAM: ${freeRamInGB.toFixed(2)} GB\x1b[0m`);
  console.log('\x1b[33m%s\x1b[0m', `📃 Script by BLACKSKY-MD`);

  setInterval(() => {}, 1000);
}

start("main.js");

const tmpDir = './tmp';
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir);
  console.log('\x1b[33m%s\x1b[0m', `📁 Created directory ${tmpDir}`);
}

process.on('unhandledRejection', (reason) => {
  console.error('\x1b[31m%s\x1b[0m', `Unhandled promise rejection: ${reason}`);
  console.error('\x1b[31m%s\x1b[0m', 'Unhandled promise rejection. Script will restart...');
  start('main.js');
});

process.on('exit', (code) => {
  console.error(`Exited with code: ${code}`);
  console.error('Script will restart...');
  start('main.js');
});