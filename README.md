监控文件或文件夹变化，一旦变化，自动发送消息通知。

## How to use

```
const WATCH_DIR = "/path";
const IGNORED = [
  "/path/dir",
  "/path/dir/file",
];
const MESSAGE_PUSHER_SERVER = '';
const MESSAGE_PUSHER_TOKEN = '';
```

## Install

```
npm install pm2 -g
npm intall
```

## Setup

```shell
pm2 start ecosystem.config.js
```

## Stop

```shell
pm2 stop watcher
```