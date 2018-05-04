const discord = require('discord.js');
const {token} = require('config.json');
const client = new Discord.Client();

let exp = RegExp(':Aal:');

client.on('ready', () => {
          console.log('Ready!');
          });

client.on('message', message => {
          if (exp.test(message.content)) {
          
          message.channel.send('Pong.');
          }
          })

client.login(token);
