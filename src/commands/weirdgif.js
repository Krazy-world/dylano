const fs = require("fs")

module.exports = {
    name: 'weirdgif',
    execute(message, args) {  
        fs.readFile("./src/txt/weirdgif.txt", "utf-8", function(err, data) {
            if (err) {
                throw err;
            }
        
            var lines = data.split('\n');
            
            var line = lines[Math.floor(Math.random()*lines.length)]
        
            message.channel.send(line)
        })        
    }
}