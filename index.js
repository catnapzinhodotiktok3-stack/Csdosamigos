const { createClient } = require('bedrock-protocol');
const express = require('express');
const app = express();
app.get('/', (req,res)=>res.send('RTP ON'));
app.listen(process.env.PORT||10000, ()=>console.log('SITE ON'));

const HOST = 'CsDosAmigos-k6LW.aternos.me';
const PORT = 62990;
const LOBBY_X = 0;
const LOBBY_Y = 100;
const LOBBY_Z = 0;

function entra(){
  console.log('Conectando...');
  const bot = createClient({host:HOST, port:PORT, username:'CsBot_10', offline:true});
  const mortes = {};

  bot.on('spawn', ()=> console.log('BOT ENTROU - RTP PRONTO'));

  bot.on('text', (p)=>{
    const msg = String(p.message||'').toLowerCase();
    const nick = p.source_name;
    if(!nick) return;
    if(nick === 'CsBot_10') return;

    if(msg === '!rtp' || msg === 'rtp' || msg.endsWith(' rtp')){
      console.log('RTP para ' + nick);
      bot.queue('text',{type:'chat',needs_translation:false,source_name:bot.username,xuid:'',platform_chat_id:'',message:'/spreadplayers 0 0 1500 5000 false ' + nick});
      bot.queue('text',{type:'chat',needs_translation:false,source_name:bot.username,xuid:'',platform_chat_id:'',message:'/tellraw ' + nick + ' {"rawtext":[{"text":"Teleportado!"}]}'});
    }

    if(msg === '!lobby' || msg === 'lobby'){
      bot.queue('text',{type:'chat',needs_translation:false,source_name:bot.username,xuid:'',platform_chat_id:'',message:'/tp ' + nick + ' ' + LOBBY_X + ' ' + LOBBY_Y + ' ' + LOBBY_Z});
    }

    if(msg === '!back' || msg === 'back'){
      if(mortes[nick]){
        const pos = mortes[nick];
        bot.queue('text',{type:'chat',needs_translation:false,source_name:bot.username,xuid:'',platform_chat_id:'',message:'/tp ' + nick + ' ' + pos.x + ' ' + pos.y + ' ' + pos.z});
      }
    }

    if(msg.includes('morreu') || msg.includes('died')){
      try{ mortes[nick] = bot.entity.position; }catch(e){}
    }
  });

  bot.on('close', ()=> setTimeout(entra, 10000));
  bot.on('error', (e)=>{ console.log(e.message); setTimeout(entra, 10000); });
}
entra();
