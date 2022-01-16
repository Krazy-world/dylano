const fs = require("fs")

module.exports = {
    name: 'gif',
    execute(message, args) {  
        // readfile memes.txt

        fs.readFile("./src/txt/gif.txt", "utf-8", function(err, data) {
            if (err) {
                throw err;
            }
        
            var lines = data.split('\n');
            
            var line = lines[Math.floor(Math.random()*lines.length)]
        
            message.channel.send(line)
        })        
    }
}