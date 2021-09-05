const dotenv = require("dotenv")
dotenv.config()

module.exports = {
  token: process.env.TOKEN,
  cardRegExp: /\[\[(.+?)\]\]/gs,

  imageSize: "large", // "small", "normal", "large", "png", "art_crop", or "border_crop"
  embedColors: {
    default: "#A0DFF7",
    W: "#f8e7b9",
    U: "#b3ceea",
    B: "#696665",
    R: "#eba082",
    G: "#c4d3ca",
    [undefined]: "#d4d4d4"
  },

  expireImage: false,
  imageExpirationTime: 1000 * 60 * 5, // (1s * 60 = 1m) * 5 = 5 mins

  expireText: false,
  textExpirationTime: 1000 * 60 * 10, // (1s * 60 = 1m) * 10 = 10 min
}
