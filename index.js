const chokidar = require("chokidar");

const WATCH_DIR = "/Users/xingbaifang/Project/watch-dir-test";
const IGNORED = [
  "/Users/xingbaifang/Project/watch-dir-test/app",
  "/Users/xingbaifang/Project/watch-dir-test/src",
];
const MESSAGE_TOKEN = '';
const MESSAGE_SERVER = 'http://push';


async function sendMessage(title, content) {
  await fetch(MESSAGE_SERVER, {
    method: 'POST',
    body: {
      title,
      content: JSON.stringify(content),
      token: MESSAGE_TOKEN,
    }
  });
}

chokidar
  .watch(WATCH_DIR, {
    ignoreInitial: true,
    ignored: IGNORED,
  })
  .on("all", async(event, path, details) => {
    const { ctime } = details;
    await sendMessage('CEC Server File Changed', {
      event,
      path,
      ctime,
    });
    console.info("Raw event info:", event, path, details);
  });
