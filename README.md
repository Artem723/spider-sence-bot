# spider sense bot

A simple telegram bot which is a part of [Spider sense project](https://github.com/not-a-genius/spiderSense) <img src="https://github.com/Artem723/spider-sence-bot/blob/master/imgs/GitHub-Mark-32px.png?raw=true" height="16px" alt="github-img" />. You can find there detailed description, documentation and architecture of the entire system.


## About this project    

The purpose of this telegram bot is to let people who are interested in particular [device](https://github.com/not-a-genius/spiderSense#description), receive urgent notifications from it.

### How does it work

A device sends GET request with its id to the server which also serves as a Telegram bot. Then, the bot will send notifications to users who are associated with the device. It's also possible to send geo data(latitude and longitude) about current position to the server so people in charge of will also know where the device is.

Example of a message from the bot:

![message-example-img](https://github.com/Artem723/spider-sence-bot/blob/master/imgs/Message_example.png?raw=true"message")

To associate a Telegram account with a device, user should speak with the bot and send to him the following command:

```
/tie {device}
```
Where `device` -- is a device id.

So, if the device with such id will send a request, the user will be notified.

To store telegram accounts associated with devices, the server uses MongoDB.

#### Structure of the REST request
* **URL**

  `GET /notification`

*  **URL Params**

   **Required:**
 
   `device_id=[string]`

   **Optional:**
 
   `lat=[number]`

   `lon=[number]`

    `name=[string]` - name of the user will be shown the Telegram message


## Getting started

To start using this bot, you need to speak with the [@BotFather ](https://telegram.me/BotFather) first, to receive a `TOKEN`;

Also you need a mongoDB instance with the following schema of documents:

```js
  {
   "deviceId": String,
   "chat_ids": [String],
  }
```

After that, create an `.env` file and write this:

```
PORT=8080
TELEGRAM_TOKEN=<YOUR_TELEGRAM_TOKEN>
MONGO_USER=<MONGO_USER>
MONGO_PASSWORD=<MONGO_PASSWORD>
```
Since node.js doesn't read from `.env` file by default, you will need additional tools for that. For example [dotenv](https://www.npmjs.com/package/dotenv) package.

### Running the bot

To run you can use even your own machine. This server receives events from Telegram using [polling technique](https://en.wikipedia.org/wiki/Polling_(computer_science)).

So, just open the root folder of the project and type to the shall `npm install` which will install all dependencies. This operation should be done only once.


Then, type `npm run start` to finally run this app.

## Credits

- Giuseppe Capaldi [<img src="https://raw.githubusercontent.com/not-a-genius/spiderSense/master/our_doc/readme_images/gitIcon.png" height="20" width="20" >](https://github.com/not-a-genius)
					[<img src="https://raw.githubusercontent.com/not-a-genius/spiderSense/master/our_doc/readme_images/inIcon.png" height="20" width="20" >](https://www.linkedin.com/in/giuseppe-capaldi-56688a171/)
- Marco Costa [<img src="https://raw.githubusercontent.com/not-a-genius/spiderSense/master/our_doc/readme_images/gitIcon.png" height="20" width="20" >](https://github.com/marcocosta96/)
					[<img src="https://raw.githubusercontent.com/not-a-genius/spiderSense/master/our_doc/readme_images/inIcon.png" height="20" width="20" >](https://www.linkedin.com/in/marco-costa-ecs)
- Artsiom Sauchuk [<img src="https://raw.githubusercontent.com/not-a-genius/spiderSense/master/our_doc/readme_images/gitIcon.png" height="20" width="20" >](https://github.com/Artem723)
 					[<img src="https://raw.githubusercontent.com/not-a-genius/spiderSense/master/our_doc/readme_images/inIcon.png" height="20" width="20" >](https://www.linkedin.com/in/artem-savchuk-7278a7170/)

## Licence

MIT
