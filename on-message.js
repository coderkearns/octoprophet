const needle = require("needle")
const querystring = require("querystring")
const discord = require("discord.js")

const config = require("./config")

module.exports = async message => {
  if (message.author.bot) return

  if (message.content.startsWith("!text")) {
    await textOnlyApi(message.content.replace("!text ", ""), message)
    return
  }

  if (config.cardRegExp.test(message.content)) {
    const cardNames = [...message.content.match(config.cardRegExp)].map(c =>
      c.replace("[[", "").replace("]]", "")
    )
    for (let card of cardNames) {
      await runApi(card, message)
    }
  }
}

async function runApi(card, message) {
  let res = await needle(
    "get",
    `https://api.scryfall.com/cards/named?${querystring.encode({
      fuzzy: card,
    })}`
  )
  if (res.body.code)
    return message.channel.send(`Could not find the card "_${card}_"`)
  message.channel
    .send({ files: [res.body.image_uris[config.imageSize]] })
    .then(m => timeout(m, false))
}

async function textOnlyApi(card, message) {
  let res = await needle(
    "get",
    `https://api.scryfall.com/cards/named?${querystring.encode({
      fuzzy: card,
    })}`
  )
  if (res.body.code)
    return message.channel.send(`Could not find the card "_${card}_"`)

  let embed = createEmbedFromRes(res.body)
  message.channel.send({ embed }).then(m => timeout(m, true))
}

function createEmbedFromRes(res) {
  const e = new discord.MessageEmbed()
  e.setColor(config.embedColor)
  e.setAuthor(res.mana_cost)
    .setTitle(`**${res.name}**`)
    .setDescription(`*${res.type_line}*\n${res.oracle_text}`)

  if (res.hasOwnProperty("power"))
    e.setFooter(`${res.power} / ${res.toughness}`)

  return e
}

function timeout(m, text) {
  if (config.expireImage && text === false)
    setTimeout(() => m.delete(), config.imageExpirationTime)
  if (config.expireText && text)
    setTimeout(() => m.delete(), config.textExpirationTime)
}
