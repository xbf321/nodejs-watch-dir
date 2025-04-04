const chokidar = require("chokidar");
const axios = require('axios');

const WATCH_DIR = "";
const IGNORED = [];
const MESSAGE_PUSHER_TOKEN = '';
const MESSAGE_PUSHER_SERVER = '';


async function sendMessage(content) {
  const postData = ({
    title: 'CEC Server',
    description: 'File Changed',
    content: JSON.stringify(content),
    token: MESSAGE_PUSHER_TOKEN,
  });
  try {
    await axios.post(MESSAGE_PUSHER_SERVER, postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch(err) {
    console.error(err);
  }
}

chokidar
  .watch(WATCH_DIR, {
    ignoreInitial: true,
    ignored: IGNORED,
  })
  .on("all", async(event, path, details) => {
    const { ctime } = details;
    await sendMessage({
      event,
      path,
      ctime,
    });
    console.info('info', event, path, details);
  });
