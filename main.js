(async () => {
  require('./config');

  const {
    useMultiFileAuthState,
    DisconnectReason,
    generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    fetchLatestBaileysVersion,
    proto
  } = require('@whiskeysockets/baileys');

  const pino = require('pino');
  const WebSocket = require('ws');
  const path = require('path');
  const fs = require('fs');
  const yargs = require('yargs/yargs');
  const cp = require('child_process');
  const lodash = require('lodash');
  const syntaxError = require('syntax-error');
  const pinoLogger = require('pino');
  const os = require('os');
  const fetch = require('node-fetch');
  const chalk = require('chalk');
  const crypto = require('crypto');
  const { makeInMemoryStore } = require('@adiwajshing/baileys');

  let simple = require('./lib/simple');

  var lowdb;
  try {
    lowdb = require('lowdb');
  } catch (error) {
    lowdb = require('./lib/lowdb');
  }

  const { Low, JSONFile } = lowdb;
  const mongoDB = require('./lib/mongoDB');
  const readline = require('readline');

  const isPairingCode = process.argv.includes('--code') || process.argv.includes('--pairing');
  const isMobileAPI = process.argv.includes('--mobile');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (text) => new Promise(resolve => rl.question(text, resolve));

  global.API = (name, path = '/', query = {}, apikey) => (
    (name in global.APIs ? global.APIs[name] : name) + path +
    (query || apikey ? '?' + new URLSearchParams(Object.entries({
      ...query,
      ...(apikey ? { [apikey]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {})
    })) : '')
  );

  global.timestamp = { start: new Date() };

  const PORT = process.env.PORT || 3000;

  process.argv.push('--db', 'mongodb+srv://User:Hahaha33.@cluster0.udprdq8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());

  if (!opts.db) opts.db = process.env.DB;

  global.prefix = /^\./;

  global.db = new Low(
    /https?:\/\//.test(opts.db || '') ?
      new cloudDBAdapter(opts.db) :
      /mongodb/.test(opts.db || '') ?
        new mongoDB(opts.db) :
        new JSONFile(path.join(__dirname, 'lib', (opts._[0] ? opts._[0] + '_' : '') + 'database.json'))
  );

  global.DATABASE = global.db;

  console.log(chalk.greenBright(`Using DB: ${opts.db?.startsWith('mongodb') ? 'MongoDB Atlas' : 'Local JSON'}`));

  global.loadDatabase = async function loadDatabase() {
    if (global.db.READ) {
      return new Promise((resolve) =>
        setInterval(function () {
          if (!global.db.READ) {
            clearInterval(this);
            resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
          }
        }, 1000)
      );
    }

    if (global.db.data !== null) return;

    global.db.READ = true;
    await global.db.read().catch(console.error);
    global.db.READ = false;

    global.db.data = {
      users: {},
      chats: {},
      stats: {},
      msgs: {},
      sticker: {},
      ...(global.db.data || {})
    };

    global.db.chain = lodash.chain(global.db.data);
  };

  await loadDatabase();

  const Plugin = require('./lib/Plugin');
  const { addPluginPath } = require('./lib/mongo');
  const pluginFolder = path.join(__dirname, 'plugins');

  const loadPluginsFromDB = async () => {
    try {
      if (!fs.existsSync(pluginFolder)) fs.mkdirSync(pluginFolder, { recursive: true });

      const plugins = await Plugin.find({});
      let loaded = 0;

      for (let plugin of plugins) {
        const filename = path.join(pluginFolder, `${plugin.name}.js`);
        fs.writeFileSync(filename, plugin.code, 'utf8');
        await addPluginPath(filename);
        loaded++;
      }

      console.log(chalk.greenBright(`✅ ${loaded} Plugins automatically loaded from MongoDB.`));
    } catch (err) {
      console.error(chalk.red('❌ Fehler beim Laden der Plugins aus MongoDB:'), err);
    }
  };

  await loadPluginsFromDB();

  const sessionsDir = '' + (opts._[0] || 'sessions');
  global.isInit = !fs.existsSync(sessionsDir);

  const { state, saveState, saveCreds } = await useMultiFileAuthState(sessionsDir);
  const { version, isLatest } = await fetchLatestBaileysVersion();

  console.log(chalk.magenta(`-- using WA v${version.join('.')}, isLatest: ${isLatest} --`));

  const connectionOptions = {
    printQRInTerminal: !isPairingCode,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {}
              },
              ...message
            }
          }
        };
      }
      return message;
    },
    auth: state,
    browser: ['Ubuntu', 'Chrome', '20.0.04'],
    logger: pino({ level: 'silent' }),
    version: (await (await fetch('https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json')).json()).version
  };

  global.conn = simple.makeWASocket(connectionOptions);

  if (!opts.test) {
    if (global.db) {
      setInterval(async () => {
        if (global.db.data) await global.db.write();

        if (!opts.tmp && (global.support || {}).find) {
          const tmp = [os.tmpdir(), 'tmp'];
          tmp.forEach(dir => cp.spawn('find', [dir, '-amin', '3', '-type', 'f', '-delete']));
        }
      }, 30 * 1000);
    }
  }

  async function connectionUpdate(update) {
    const { connection, lastDisconnect } = update;
    global.timestamp.connect = new Date();

    if (
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output &&
      lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut &&
      conn.ws.readyState !== WebSocket.CONNECTING
    ) {
      console.log(chalk.redBright('Reconnecting...'));
      await global.reloadHandler(true);
    }

    if (global.db.data == null) await loadDatabase();
  }

  if ((isPairingCode || isMobileAPI) && fs.existsSync('./sessions/creds.json') && !conn.authState.creds.registered) {
    console.log(chalk.yellow('-- WARNING: creds.json is broken, please delete it first --'));
    process.exit(0);
  }

  if (isPairingCode && !conn.authState.creds.registered) {
    if (isMobileAPI) throw new Error('Cannot use pairing code with mobile api');

    let phoneNumber = '';
    do {
      phoneNumber = await question(chalk.blueBright('ENTER A VALID NUMBER START WITH REGION CODE. Example : 62xxx:\n'));
      if (!/^\d+$/.test(phoneNumber) || phoneNumber.length < 10) {
        console.log(chalk.red('Invalid phone number. Please enter a valid number.'));
      }
    } while (!/^\d+$/.test(phoneNumber) || phoneNumber.length < 10);

    rl.close();
    phoneNumber = phoneNumber.replace(/\D/g, '');
    console.log(chalk.bgWhite(chalk.blue('-- Please wait, generating code... --')));

    setTimeout(async () => {
      try {
        let code = await conn.requestPairingCode(phoneNumber);
        code = code?.match(/.{1,4}/g)?.join('-') || code;
        console.log(chalk.black(chalk.bgGreen('Your Pairing Code : ')), chalk.black(chalk.white(code)));
      } catch (error) {
        console.error(chalk.red('Error generating pairing code:'), error);
      }
    }, 3000);
  }

  process.on('uncaughtException', (error) => {
    console.error(chalk.red('Uncaught Exception:'), error);
  });

  const dynamicRequire = (file) => {
    file = require.resolve(file);
    let module, count = 0;

    do {
      if (file in require.cache) delete require.cache[file];
      module = require(file);
      count++;
    } while (
      (!module || (Array.isArray(module) || module instanceof String) ? !(module || []).length :
        typeof module == 'object' && !Buffer.isBuffer(module) ? !Object.keys(module || {}).length : true) &&
      count <= 10
    );

    return module;
  };

  let isFirstInit = true;

  global.reloadHandler = function (reloadConn) {
    let handler = dynamicRequire('./handler');

    if (reloadConn) {
      try {
        global.conn.ws.close();
      } catch { }
      global.conn = {
        ...global.conn,
        ...simple.makeWASocket(connectionOptions)
      };
    }

    if (!isFirstInit) {
      conn.ev.removeAllListeners('messages.upsert');
      conn.ev.removeAllListeners('group-participants.update');
      conn.ev.removeAllListeners('message.delete');
      conn.ev.removeAllListeners('connection.update');
      conn.ev.removeAllListeners('creds.update');
    }

    conn.welcome = 'Selamat datang @user di group @subject utamakan baca desk ya \n@desc';
    conn.bye = 'Selamat tinggal @user 👋';
    conn.promote = '@user sekarang admin!';
    conn.demote = '@user sekarang bukan admin!';

    conn.handler = handler.handler.bind(conn);
    conn.participantsUpdate = handler.participantsUpdate.bind(conn);
    conn.onDelete = handler.delete.bind(conn);
    conn.connectionUpdate = connectionUpdate.bind(conn);
    conn.credsUpdate = saveCreds.bind(conn);

    conn.ev.on('messages.upsert', conn.handler);
    conn.ev.on('group-participants.update', conn.participantsUpdate);
    conn.ev.on('message.delete', conn.onDelete);
    conn.ev.on('connection.update', conn.connectionUpdate);
    conn.ev.on('creds.update', conn.credsUpdate);

    isFirstInit = false;
    return true;
  };

  let pluginsDir = path.join(__dirname, 'plugins');
  let pluginFilter = filename => /\.js$/.test(filename);

  global.plugins = {};

  for (let filename of fs.readdirSync(pluginsDir).filter(pluginFilter)) {
    try {
      global.plugins[filename] = require(path.join(pluginsDir, filename));
    } catch (e) {
      conn.logger.error(e);
      delete global.plugins[filename];
    }
  }

  console.log(Object.keys(global.plugins));

  global.reload = (event, filename) => {
    if (pluginFilter(filename)) {
      let filePath = path.join(pluginsDir, filename);

      if (filePath in require.cache) {
        delete require.cache[filePath];

        if (fs.existsSync(filePath)) {
          conn.logger.info(`re - require plugin '${filename}'`);
        } else {
          conn.logger.warn(`deleted plugin '${filename}'`);
          return delete global.plugins[filename];
        }
      } else {
        conn.logger.info(`requiring new plugin '${filename}'`);
      }

      let err = syntaxError(fs.readFileSync(filePath), filename);

      if (err) {
        conn.logger.error(`syntax error while loading '${filename}'\n${err}`);
      } else {
        try {
          global.plugins[filename] = require(filePath);
        } catch (e) {
          conn.logger.error(e);
        } finally {
          global.plugins = Object.fromEntries(
            Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
          );
        }
      }
    }
  };

  Object.freeze(global.reload);

  fs.watch(path.join(__dirname, 'plugins'), global.reload);

  global.reloadHandler();

  async function checkSystemSupport() {
    let promises = [
      cp.spawn('ffmpeg'),
      cp.spawn('ffprobe'),
      cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
      cp.spawn('convert'),
      cp.spawn('magick'),
      cp.spawn('gm'),
      cp.spawn('find', ['--version'])
    ].map(p => {
      return Promise.race([
        new Promise(resolve => {
          p.on('close', code => {
            resolve(code !== 127);
          });
        }),
        new Promise(resolve => {
          p.on('error', _ => resolve(false));
        })
      ]);
    });

    let [
      ffmpeg,
      ffprobe,
      ffmpegWebp,
      convert,
      magick,
      gm,
      find
    ] = await Promise.all(promises);

    let support = global.support = {
      ffmpeg,
      ffprobe,
      ffmpegWebp,
      convert,
      magick,
      gm,
      find
    };

    Object.freeze(global.support);

    if (!support.ffmpeg) {
      conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)');
    }

    if (support.ffmpeg && !support.ffmpegWebp) {
      conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)');
    }

    if (!support.convert && !support.magick && !support.gm) {
      conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)');
    }
  }

  checkSystemSupport()
    .then(() => conn.logger.info('Quick Test Done'))
    .catch('done');
})();