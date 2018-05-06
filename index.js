const discord = require('discord.js');
const {token, males, females, channelID} = require('./config.json');
const client = new discord.Client();
var channel = client.channels.get(channelID);
let months =['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September' ,'Oktober', 'November', 'Dezember'];

let exp1 = RegExp(':aal:');
let exp2 = RegExp(':Aal2:');

client.on('ready', () => {
          date = new Date();
          channel = client.channels.get(channelID);
          console.log(channel)
          console.log('Ready! at ' + date);
          });

client.on('message', message => {
          if (exp1.test(message.content) || exp2.test(message.content)) {
          react(message.author, ' brutal geworfen');
          }
          })
// this code is copied from https://github.com/discordjs/guide/tree/master/code_samples/popular-topics/reactions creator is Sanctuary Danktuary

const events = {
MESSAGE_REACTION_ADD: 'messageReactionAdd',
MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
          if (!events.hasOwnProperty(event.t)) return;
          
          const { d: data } = event;
          const user = client.users.get(data.user_id);
          const channel = client.channels.get(data.channel_id) || await user.createDM();
          
          if (channel.messages.has(data.message_id)) return;
          
          const message = await channel.fetchMessage(data.message_id);
          const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
          const reaction = message.reactions.get(emojiKey);
          
          client.emit(events[event.t], reaction, user);
          });

//this is mine
client.on('messageReactionAdd', (reaction, user) => {
          console.log(reaction)
          if (exp1.test(reaction.emoji.toString()) || exp2.test(reaction.emoji.toString())) {
          react(user, 'grausam an eine Nachricht angetackert');
          }
          })

client.on('disconnect', () => {
          date = new Date();
          console.log('disconnected at' + date);
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
    let hours = date.getMinutes().toString()
    let minutes = date.getHours().toString();
    console.log(date.getMinutes());
    if (date.getMinutes() < 10){
        minutes = '0' + minutes;
    }
    if (date.getHours() < 10){
        hours = '0' + hours;
    }
    channel.send('Am ' + date.getDate() + '.' + months[date.getMonth()] + ' ' + date.getFullYear() +' um '+ hours + ':' + minutes +' wurde '+ name +' von ' + author.toString() + ' ' + crime + '. Schäm dich ' + author.toString() + '! Wir versichern den Eltern '+ males[Math.floor(Math.random()*6)] +' und '+ females[Math.floor(Math.random()*6)] +' sowie ' + partner +' und den Kindern unser tiefstes Beileid.');
    
}
