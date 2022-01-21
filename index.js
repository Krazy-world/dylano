const Discord = require("discord.js")

const { Intents } = require("discord.js")

const fs = require("fs")

const ytdl = require("ytdl-core")

const prefix = 'dylano '

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
})

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))
for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`)

    client.commands.set(command.name, command)
}

client.on("ready", (bot) => {
    console.log("bot online")
    client.user.setActivity("a massive dump", { type: "WATCHING" })
})

client.on("message", async (message) => {

    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    
    switch (command) {
        case "help":
            client.commands.get("help").execute(message, args)
            break
        case "play":
            client.commands.get("play").execute(message, args, command)
            break
        case "skip":
            client.commands.get("play").execute(message, args, command)
            break
        case "stop":
            client.commands.get("play").execute(message, args, command)
            break
        case "pause":
            client.commands.get("pause").execute(message, args)
            break
        case "eastereggs":
            client.commands.get("eastereggs").execute(message, args)
            break
        case "gif":
            client.commands.get("gif").execute(message, args)
            break
        case "weirdgif":
            client.commands.get("weirdgif").execute(message, args)
            break
    }

    if (message.author == client.user) return
    if (message.author.username == "Identificational") {
        message.react("🤡")
        return
    }
    if (message.content == "dylano thanks") {
        message.channel.send("of course")
        return
    }
    if (message.author == client.user) return
    if (message.author.username == "Ant-Man") {
        message.react("👍")
        return
    }
    if (message.content == "im sad") {
        message.channel.send("https://cdn.discordapp.com/attachments/789006833884463135/928282329670119445/I_missed_the_part_where_thats_my_problem..mp4")
        return
    }
    if (message.content == "im happy") {
        message.channel.send("https://cdn.discordapp.com/attachments/789006833884463135/928282329670119445/I_missed_the_part_where_thats_my_problem..mp4")
        return
    }
    if (message.content == "jarfix") {
        message.channel.send("https://cdn.discordapp.com/attachments/928110871518003280/929624692606787594/DukeWithJarfix128.png")
        return
    }
    if (message.content == "ty dylano") {
        message.channel.send("of course")
        return
    }
    if (message.content == "dylano fart") {
        message.channel.send("okay senor lemme build it up gimme a sec")
        let voiceChannel = message.member.voice.channel
        if (voiceChannel) {
            const connection = await voiceChannel.join()
            await connection.play(ytdl("https://www.youtube.com/watch?v=jKcRDgobqzA", { filter: "audioonly" })).on("finish", () => {
                connection.disconnect()
            })
        }
        return
    }
    if (message.content.toLowerCase().includes("varaz") && !message.content.toLowerCase().includes("bad")) {
        message.channel.send("ratio")
        message.react("👍")
        return
    }
    if (message.content == "send more jarfix") {
        for (let i = 0; i < 5; i++) {
            message.channel.send("https://cdn.discordapp.com/attachments/928110871518003280/929624692606787594/DukeWithJarfix128.png")
        }
        return
    }
    if (message.content == "jarfix2") {
        message.channel.send("https://cdn.discordapp.com/attachments/929518155464867851/929627296149688320/jarfix-success-win10-en.png")
        return
    }
    if (message.content == "fnaf lore") {
        message.channel.send("https://www.youtube.com/watch?v=RP0ke-hNseU")
        return
    }
    if (message.content == "thanks dylano") {
        message.channel.send("of course")
        return
    }
    if (message.content.toLowerCase().includes("ratio")) {
        let msg = message.channel.send("ratio");
        (await msg).react("👍")
        return
    }
})

client.on("guildMemberAdd", (member) => {
    member.send("Hello and welcome to the sacred offical *Dylano Bot* discord server, I, dylano will be of service to you for any operations which need to be persued.")
    member.setNickname("dylano follower")
    member.roles.add("931820157523865620")
})
