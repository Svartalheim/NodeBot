require('dotenv').config();
var token = process.env.NODE_BOT_TOKEN

const { Client } = require('discord.js');
const client = new Client();
const PREFIX = "$"

client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in`)
})

client.on('message',(message)=>{
    if(message.author.bot) return;
    // jika bot yang mengirim pesan maka tidak ada respon
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content
        //$kick 123
        //kick itu CMD_NAME, args itu setelahnya
        .trim()
        //remove whitespace from side of a string
        .substring(PREFIX.length)
        .split(/\s+/ )
        //s+ for whitespace
        if(CMD_NAME === "kick"){
            if(!message.member.hasPermission('KICK_MEMBERS')) 
              return message.reply("You dont have permission to kick")
            if(args.length === 0) 
              return message.reply('Please provide ID')
            const member = message.guild.members.cache.get(args[0])
            if(member){
                member
                .kick()
                .then((member) => message.channel.send(`${member} kicked`))
                .catch((error)=> message.channel.send('I cannot kick that user'))
            }else{
                message.channel.send("Member not found")
            }
        }
        if(CMD_NAME === "ban"){
            if(!message.member.hasPermission('BAN_MEMBERS'))
              return message.reply("You dont have permission to ban")
            if(args.length === 0)
              return message.reply("Please provide ID")
            
            try {
              const member = message.guild.members.ban(args[0])
                message.channel.send(`${member} has been banned`)
            } catch (error) {
              message.channel.send("Member not found")
            }
        }
    }
})
client.login(token)