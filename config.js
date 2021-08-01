const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  token: process.env.TOKEN,
  cardRegExp: /\[\[(.+?)\]\]/gs,

  imageSize: "large", // "small", "normal", "large", "png", "art_crop", or "border_crop"
  embedColor: "#A0DFF7",

  expireImage: false,
  imageExpirationTime: 1000 * 60 * 5, // (1s * 60 = 1m) * 5 = 5 mins

  expireText: false,
  textExpirationTime: 1000 * 60 * 10, // (1s * 60 = 1m) * 10 = 10 min
}
