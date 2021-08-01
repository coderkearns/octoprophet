const client = require("./client")
const keepAlive = require("./keep-alive")
const config = require("./config")

client.login(config.token)
keepAlive()
