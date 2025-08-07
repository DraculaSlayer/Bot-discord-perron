const discord = require("discord.js");

class Formulario {
  constructor() {
    this.author = "";
    this.text = "";
    this.title = "";
    this.image = "";
    this.color = "";

    this.embed = new discord.EmbedBuilder(); //Crea un embed
  }

  //Esta funcion sirve para sacar la URL de la imagen
  async there_is_image(channel, filter) {
    await channel.send("Manda tu Imagen:");

    this.image = (await channel.awaitMessages({ filter, max: 1 })).first();

    this.manipule = this.image.attachments.first(); //Accede al attachments para saber si se mando un imagen o no

    this.manipule = this.manipule.url; //Saca la URL de attachments
  }

  //Añade color
  async add_color(channel, filter) {
    await channel.send("Escribe el color (en hex):");

    this.color = (await channel.awaitMessages({ filter, max: 1 })).first().content;
    this.color = "0x" + this.color;
    this.color = parseInt(this.color);
  }

  async start(channel, message) { //Funcion de inicio del comando

    //filtra aver si es un bot o un usuario
    const filter = (m) => m.author.id === message.author.id;

    await channel.send("Nombre del Autor?:");
    this.author = (await channel.awaitMessages({ filter, max: 1 })).first().content;

    await channel.send("Titulo del Embed:");
    this.title = (await channel.awaitMessages({ filter, max: 1 })).first().content;

    await channel.send("Descripción del Mensaje:");
    this.text = (await channel.awaitMessages({ filter, max: 1 })).first().content;

    await channel.send("Color del Embed [y o n]:");
    this.color = (await channel.awaitMessages({ filter, max: 1 })).first().content;

    if (this.color === "y") {
      await this.add_color(channel, filter);
    }else {
      this.color = "0xFFA633";
    }

    await channel.send("Tiene Imagen? [y o n]:");
    this.image = (await channel.awaitMessages({ filter, max: 1 })).first().content;

    if (this.image === "y") {
      await this.there_is_image(channel, filter);
    }

    this.embed.setAuthor({ name: this.author});
    this.embed.setTitle(this.title);
    this.embed.setDescription(this.text);
    this.embed.setImage(this.manipule);
    this.embed.setColor(this.color)

    await channel.send({embeds: [this.embed]});
  }
}

module.exports = Formulario;
