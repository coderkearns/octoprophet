const discord = require("discord.js")
const config = require("./config")
const onMessage = require("./on-message")

const client = new discord.Client()

client.once("ready", () => {
  console.log(`[INFO] ${client.user.tag} is ready`)
})

client.on("message", onMessage)

module.exports = client
