const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const { MessageEmbed } = require("discord.js");
const queue = new Map();

const errorEmbed = new MessageEmbed()
    .setColor("#ff6666")
    .setTitle("lmao no bozo")
    .setDescription("You need to be in a voice channel to use this command!");

const anotherErrorEmbed = new MessageEmbed()
    .setColor("#ff6666")
    .setTitle("lmao no bozo")
    .setDescription("You need to provide a song name or a link!");

const yetAnotherErrorEmbed = new MessageEmbed()
    .setColor("#ff6666")
    .setTitle("lmao no bozo")
    .setDescription("Could not find a song with that name!");

const wellWellWellTheresYetAnotherEmbed = new MessageEmbed()
    .setColor("#ff6666")
    .setTitle("lmao no bozo")
    .setDescription("There is no song to skip!");


module.exports = {
    name: "play",
    async execute(message, args, command) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send(errorEmbed);

        const server_queue = queue.get(message.guild.id);

        if (command == "play") {
            if (!args.length) return message.channel.send(anotherErrorEmbed);
            let song = {}
    
            if (ytdl.validateURL(args[0])) {
                const songInfo = await ytdl.getInfo(args[0]);
                song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };
            } else {
                const video_finder = async (query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
                }
    
                const video = await video_finder(args.join(" "));
    
                if (video) {
                    song = { title: video.title, url: video.url };
                } else {
                    return message.channel.send(yetAnotherErrorEmbed);
                }
            }
    
            if (!server_queue) {
                const queue_contructer = {
                    voiceChannel: voiceChannel,
                    text_channel: message.channel,
                    connection: null,
                    songs: [],
                }
    
                queue.set(message.guild.id, queue_contructer);
                queue_contructer.songs.push(song);
    
                try {
                    const connection = await voiceChannel.join();
                    queue_contructer.connection = connection;
                    video_player(message.guild, queue_contructer.songs[0]);
                } catch (err) {
                    console.log("Error connecting to the voice channel!")
                    queue.delete(message.guild.id);
                    throw err
                }
            } else {
                server_queue.songs.push(song);
                let songEmbed = new MessageEmbed()
                    .setColor("#0099ff")
                    .setTitle(`Jukebox`)
                    .addField("Song Added", song.title)
                    .addField("Queue Length", server_queue.songs.length)
                    .addField("Queue List", server_queue.songs.map(song => song.title).join("\n"))
                return message.channel.send(songEmbed);
            }
        }
        
        else if (command == "skip") skip_song(message, server_queue)
        else if (command == "stop") stop_song(message, server_queue)
    }  
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);

    if (!song) {
        song_queue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: "audioonly" });
    song_queue.connection.play(stream, { seek: 0, volume: 0.5 }).on("finish", () => {
        song_queue.songs.shift()
        video_player(guild, song_queue.songs[0])
    })
    let songEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(`Jukebox`)
        .addField("Now Playing", song.title)
    await song_queue.text_channel.send(songEmbed);
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send(errorEmbed);
    if (!server_queue) return message.channel.send(wellWellWellTheresYetAnotherEmbed);
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.channel.send(errorEmbed);
    if (!server_queue) return message.channel.send(wellWellWellTheresYetAnotherEmbed);
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}