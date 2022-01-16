const {  MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    async execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle("suit urself dumbass")
            .setDescription("heres some commands")
            .setColor("#0099ff")
            .setFooter("dylano's basement")
            .setTimestamp()
            .setThumbnail("https://cdn.discordapp.com/attachments/929518155464867851/929650656497774632/unknown.png")
            .addField("dylano play", "dylano plays song")
            .addField("dylano skip", "dylano skips song")
            .addField("dylano stop", "dylano dips")
            .addField("dylano gif", "dylano send gif")
            .addField("dylano weirdgif", "dylano send weird gif")
            message.channel.send(embed)
    }
}