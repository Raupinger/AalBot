const discord = require('discord.js');
const {token, males, females, channelID} = require('./config.json');
const client = new discord.Client();
var channel = client.channels.get(channelID);
let months =['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September' ,'Oktober', 'November', 'Dezember'];

let exp = RegExp(':Aal:');

client.on('ready', () => {
          date = new Date();
          channel = client.channels.get(channelID);
          console.log(channel)
          console.log('Ready! at ' + date);
          });

client.on('message', message => {
          if (exp.test(message.content)) {
          react(message.author, ' brutal geworfen.');
          }
          })

client.on('messageReactionAdd', (reaction, user) => {
          console.log(reaction)
          if (exp.test(reaction.emoji.toString())) {
          react(user, 'grausam an eine Nachricht angetackert');
          }
          })

client.on('disconnect', () => {
          date = new Date();
          console.log('disconnected at' + date.toLocalTimeString());
          });

client.on('error', error => {
          date = new Date();
          console.log('error at' + date);
          console.log(error);
          });

client.login(token);

function react(author, crime) {

    
                          let date = new Date();
                          let partner = '**FEHLER**';
                          let name = '**FEHLER**';
                          let male = true;
                          if (Math.random() > 0.5){
                          male = true;
                          partner = 'seiner Frau ' + females[Math.floor(Math.random()*6)];
                          name = males[Math.floor(Math.random()*6)];
                          console.log('male');
                          } else {
                          male = false;
                          name = females[Math.floor(Math.random()*6)];
                          partner = 'ihrem Mann ' + males[Math.floor(Math.random()*6)];
                          console.log('female');
                          }
                          channel.send('Am ' + date.getDate() + '.' + months[date.getMonth()] + ' ' + date.getFullYear() +' um '+ date.getHours() + ':' + date.getMinutes() +' wurde '+ name +' von ' + author.toString() + crime + '. Schäm dich ' + author.toString() + '! Wir versichern den Eltern '+ males[Math.floor(Math.random()*6)] +' und '+ females[Math.floor(Math.random()*6)] +' sowie ' + partner +' und den Kindern unser tiefstes Beileid.');
    

}
