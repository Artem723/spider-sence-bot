const url = require('url');

const dataStub = [
    {
        device_id: "deviceId",
        chat_id: null,
    },
];

function createEchoHandler(bot) {
    return function onEcho(msg, match) {
        bot.sendMessage(msg.chat.id, match[1]);
    }
}

function createTierHandler(bot) {
    return function onTie(msg, match) {
        const matchedWord = match[1];
        const index = dataStub.findIndex(el => el.device_id === matchedWord);
        if (index >= 0) {
            dataStub[index].chat_id = msg.chat.id;
            bot.sendMessage(msg.chat.id, `Done!`);            
        } else {
            bot.sendMessage(msg.chat.id, `Device with ${matchedWord} is not found 😢`);
        }
    }
}

function createNotificationServerHandler(bot) {
    return function onDeviceNotification(req, res) {
        const { pathname, query } = url.parse(req.url, true);

        if (req.method === 'GET' && pathname === '/notification' && query && query.device_id) {
            const dataEntity = dataStub.find(el => el.device_id === query.device_id);
            if (dataEntity) {
                dataEntity.chat_id && bot.sendMessage(dataEntity.chat_id, `❗`);
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(dataEntity.chat_id ? 'Ok, notified!' : 'Client is not connected!');
            } else {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end(`Device with id:${query.device_id}! 😢`);
            }
        } else {
            res.end(`Unknown request!`);
        }
    }
}

exports.createEchoHandler = createEchoHandler;
exports.createNotificationServerHandler = createNotificationServerHandler;
exports.createTierHandler = createTierHandler;