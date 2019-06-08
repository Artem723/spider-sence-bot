/**
 * Module for mongoDB operations
 * 
 * The schema of documents:
 * {
 *  deviceId: String,
 *  chat_ids: [String],
 * }
 */
const MongoClient = require('mongodb').MongoClient;

const mongoUser = process.env.MONGO_USER;
const mongoPWD = process.env.MONGO_PASSWORD;
const connectionString = `mongodb://${mongoUser}:${mongoPWD}@ds259806.mlab.com:59806/spider-sense-db`;
const dbName = 'spider-sense-db';
const colName = 'usersMapping_v2';

const client = new MongoClient(connectionString);
let db = null;
let col = null;

client.connect((err) => {
    if (err) throw err;
    console.log("Connected successfully to server");
    
    db = client.db(dbName);
    col = db.collection(colName);
});
/**
 * Attach telegram user's chat with 'chatId' to the particular device with 'deviceId'
 * @param {String} deviceId
 * @param {String} chatId
 * @param {Function} cb - callback
 */
function setChatId(deviceId, chatId, cb) {
    if (!col) {
        cb(null);
        return;
    }
    getDocByDeviceId(deviceId, (doc) => {
        if (!doc) {
            cb(null);
            return;
        }
        console.log('DOC: ', doc);
        chatIds = doc.chat_ids.concat(chatId);
        col.findOneAndUpdate({device_id: deviceId}, {$set: {chat_ids: chatIds}}, (err, r) => {
        if (err) {
            console.log(err);
            cb(null);
        } else {
            cb(r);
        }
    })});    
}
/**
 * Retrieve a document for particular device by its id
 * @param {String} deviceId
 * @param {Function} cb - callback
 */
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