const { createClient } = require('bedrock-protocol');
const express = require('express');
const app = express();
app.get('/', (r,s)=>s.send('ON'));
app.listen(process.env.PORT||10000);
const bot = createClient({
  host:'CsDosAmigos-k6LW.aternos.me',
  port:62990, // COLOCA A PORTA NOVA AQUI
  username:'CsBot_10',
  offline:true,
  skipPing:true
});
bot.on('spawn', ()=>console.log('ENTROU 1/20 RTP PRONTO'));
bot.on('text', p=>{
  const nick = p.source_name;
  if(!nick || nick=='CsBot_10') return;
  if(p.message.includes('rtp')){
    bot.queue('text',{type:'chat',message:'/spreadplayers 0 0 1500 5000 false '+nick,needs_translation:false,source_name:bot.username,xuid:'',platform_chat_id:''});
  }
  if(p.message.includes('lobby')){
    bot.queue('text',{type:'chat',message:'/tp '+nick+' 0 100 0',needs_translation:false,source_name:bot.username,xuid:'',platform_chat_id:''});
  }
});
bot.on('close', ()=>setTimeout(()=>process.exit(1),5000));
