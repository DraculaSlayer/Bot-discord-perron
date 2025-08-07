const discord = require("discord.js");
const { IP } = require("../config.json");

class Ip {
  constructor() {
    this.embed = new discord.EmbedBuilder()
    .setColor(0xFFA633);
  }

  async start(channel) {

    this.embed.setTitle("IP:");
    this.embed.setDescription(IP);    
    
    await channel.send({embeds: [this.embed]});
  }
}

module.exports = Ip;
