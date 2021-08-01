const express = require("express")
const client = require("./client")

const app = express()

app.get("/", (req, res) => {
  res.send(`${client.user.tag} is ready!`)
})

module.exports = () => {
  app.listen(5000)
}
