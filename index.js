const { createClient } = require('bedrock-protocol');
const express = require('express');
const app = express();
app.get('/', (r,s)=>s.send('Bot CsDosAmigos ON'));
app.listen(process.env.PORT||10000, ()=>console.log('SITE ON'));

function entra(){
console.log('Conectando no Aternos...');
const bot = createClient({host:'CsDosAmigos-k6LW.aternos.me',port:62990,username:'CsBot_10',offline:true});
bot.on('spawn',()=>{console.log('ENTREI 1/20!!!');});
bot.on('close',()=>setTimeout(entra,90000));
bot.on('error',(e)=>{console.log(e.message);setTimeout(entra,90000);});
}
entra();
