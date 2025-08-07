const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token, ChannelId } = require("./config.json");
const Formulario = require("./commands/Formulario");
const Ip = require("./commands/Ip.js");

const formulario = new Formulario();

const ip = new Ip();

class BotClient extends Client {
    constructor() {
        super({
            //Crear la instancia para que el bot reciba eventos
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });

        //Para que el bot reciba mas argumento aparte de el comando
        this.commands = new Collection();
    }

    setupEvents() {
        //Informa que el bot esta listo para usar
        this.on("ready", () => {
            console.log("El Bot", this.user.tag, "esta listo!!!");
        });

        //This is a ez shit (es la funcion principal)
        this.on("messageCreate", async (message) => {
            if (message.author.bot) return;
          
            const channel = message.channel;

            if (message.content === "/formulario" && message.channelId === ChannelId) {

                formulario.start(channel, message);
                
            }
            if (message.content === "/ip") {
                ip.start(channel);
            }
            
        });
    }

    //Funcion que inicia el bot
    start() {
        this.setupEvents();
        this.login(token);
    }
}

module.exports = BotClient;
