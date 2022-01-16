const {  MessageEmbed } = require("discord.js")

module.exports = {
    name: "eastereggs",
    async execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle("suit urself dumbass")
            .setDescription("heres some commands")
            .setColor("#0099ff")
            .setFooter("dylano's basement")
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/attachments/929658040624508929/931819160781062175/dylonao.png")
            .addField("jarfix", "dylano sends jarfix")
            .addField("jarfix2", "dylano sends another jarfix")
            .addField("send more jarfix", "dylano sends even more jarfix")
        message.channel.send(embed)
    }
}