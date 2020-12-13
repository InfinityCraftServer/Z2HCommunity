const Discord = require("discord.js")
const botconfig = require("../config.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    developers = ["478260337536139264", "259782176655015937"]
    fs.readdir("./commands", (err, files) => {

        if (err) console.log(err)

        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if (jsfile.length <= 0) {
            return console.log("No commands found");
        }
        var helpembed = new Discord.MessageEmbed()
            .setTitle("Command list")
            .setColor("7DE5E3")
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter("DonZ2H Community Bot")
            .addField('\u200B', '***Player Commands***')
        jsfile.forEach((f, i) => {
            let pull = require(`./${f}`);
            if (pull.config.permission == "PLAYER") {
                helpembed
                    .addField(pull.config.name, pull.config.description)
            }
        });
        if (message.member.hasPermission("ADMINISTRATOR")) {
            helpembed
                .addField('\u200B', '***Staff Commands***')
            jsfile.forEach((f, i) => {
                let pull = require(`./${f}`);
                if (pull.config.permission == "ADMINISTRATOR") {
                    helpembed
                        .addField(pull.config.name, pull.config.description)
                }
            });
        }
        if (developers.includes(message.author.id)) {
            helpembed
                .addField('\u200B', '***Developer Commands***')
            jsfile.forEach((f, i) => {
                let pull = require(`./${f}`);
                if (pull.config.permission == "DEVELOPER") {
                    helpembed
                        .addField(pull.config.name, pull.config.description)
                }
            });
        }
            message.author.send(helpembed).catch(() => {
                message.reply("***DM attempt failed, hulp word nu hier gestuurd***")
                message.channel.send(helpembed)
                return;
            });
            message.reply("De commands staan in je dm!")

    });
}

module.exports.config = {
    name: "help",
    description: "geeft alle commando's waar je toegang tot hebt",
    aliases: ['commands'],
    permission: "PLAYER"
}