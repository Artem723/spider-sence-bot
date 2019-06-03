const url = require('url');
const db = require('./repository');

function createEchoHandler(bot) {
    return function onEcho(msg, match) {
        bot.sendMessage(msg.chat.id, match[1]);
    }
}

function createTierHandler(bot) {
    return function onTie(msg, match) {
        const deviceId = match[1];
        db.setChatId(deviceId, msg.chat.id, (r) => {
            if (r && r.value) {
                bot.sendMessage(msg.chat.id, `Done!`);
            } else {
                bot.sendMessage(msg.chat.id, `Device with ${deviceId} is not found 😢`);
            }
        });
    }
}

function createNotificationServerHandler(bot) {
    return function onDeviceNotification(req, res) {
        const { pathname, query } = url.parse(req.url, true);

        if (req.method === 'GET' && pathname === '/notification' && query && query.device_id) {
            db.getDocByDeviceId(query.device_id, (doc) => {
                if (doc) { // send message to moltiple receivers with chat id
                    doc.chat_ids && doc.chat_ids.forEach(id => {
                        bot.sendMessage(id, `❗`);
                    });
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end(doc.chat_ids ? 'Ok, notified!' : 'Client is not connected!');
                } else {
                    res.writeHead(400, { "Content-Type": "text/plain" });
                    res.end(`Cannot find device with id:${query.device_id}! 😢`);
                }
            });
        } else {
            res.end(`Unknown request!`);
        }
    }
}

exports.createEchoHandler = createEchoHandler;
exports.createNotificationServerHandler = createNotificationServerHandler;
exports.createTierHandler = createTierHandler;