const { createClient } = require('bedrock-protocol');
const express = require('express');
const app = express();
app.get('/', (r,s)=>s.send('ON'));
app.listen(process.env.PORT||10000, ()=>console.log('SITE ON'));

const HOST = 'CsDosAmigos-k6LW.aternos.me';
const PORT = 62990; // troca se mudou no i azul
const bot = createClient({
  host: HOST,
  port: PORT,
  username: 'CsBot_10',
  offline: true,
  skipPing: true
});

const mortes = {};

bot.on('spawn', ()=> console.log('BOT ENTROU - RTP LOBBY BACK PRONTO'));

bot.on('text', (p)=>{
  const msg = String(p.message||'').toLowerCase();
  const nick = p.source_name;
  if(!nick || nick === 'CsBot_10') return;

  if(msg.includes('rtp')){
    bot.queue('text',{type:'chat',needs_translation:false,source_name:bot.username,xuid:'',platform_chat_id:'',message:'/spreadplayers 0 0 1500 5000 false ' + nick});
  }

  if(msg.includes('lobby')){
    bot.queue('text',{type:'chat',needs_translation:false,source_name:bot.username,xuid:'',platform_chat_id:'',message:'/spawn ' + nick});
  }

  if(msg.includes('back')){
    const pos = mortes[nick];
    if(pos){
      bot.queue('text',{type:'chat',needs_translation:false,source_name:bot.username,xuid:'',platform_chat_id:'',message:'/tp ' + nick + ' ' + pos.x + ' ' + pos.y + ' ' + pos.z});
    }
  }

  if(msg.includes('morreu') || msg.includes('died') || msg.includes('was slain')){
    try{ mortes[nick] = bot.entity.position; }catch(e){}
  }
});

bot.on('close', ()=> setTimeout(()=>process.exit(1), 5000));
bot.on('error', (e)=>{ console.log(e.message); setTimeout(()=>process.exit(1), 5000); });
