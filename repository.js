const MongoClient = require('mongodb').MongoClient;

const mongoUser = process.env.MONGO_USER;
const mongoPWD = process.env.MONGO_PASSWORD;
const connectionString = `mongodb://${mongoUser}:${mongoPWD}@ds259806.mlab.com:59806/spider-sense-db`;
const dbName = 'spider-sense-db';

const client = new MongoClient(connectionString);
let db = null;
let col = null;

client.connect((err) => {
    console.log("Connected successfully to server");
    db = client.db(dbName);
    col = db.collection('usersMapping');
});

function setChatId(deviceId, chatId, cb) {
    col && col.findOneAndUpdate({device_id: deviceId}, {$set: {chat_id: chatId}}, (err, r) => {
        if (err) {
            console.log(err);
            cb(null);
        } else {
            cb(r);
        }
    });
        
}

function getDocByDeviceId(deviceId, cb) {
    col && col.find({ device_id: deviceId }).limit(1).next((err, doc) => {
        if (err) {
            console.error(err); 
            cb(null);
        } else {
            cb(doc);
        }
    });
}

exports.setChatId = setChatId;
exports.getDocByDeviceId = getDocByDeviceId;