const { createClient } = require('bedrock-protocol');
const express = require('express');
const app = express();
app.get('/',(r,s)=>s.send('RTP ON'));
app.listen(process.env.PORT||10000,()=>console.log('SITE ON'));

const HOST = 'CsDosAmigos-k6LW.aternos.me';
const PORT = 62990;
const LOBBY = { x: 0, y: 100, z: 0 }; // TROCA aqui pela coord do seu lobby

function cmd(bot, comando){
  try{ bot.queue('text',{type:'chat',needs_translation:false,source_name:bot.username,xuid:'',platform_chat_id:'',message:'/'+comando}); }catch{}
}

const mortes = {};

function entra(){
console.log(`Conectando ${HOST}:${PORT}...`);
const bot = createClient({host:HOST,port:PORT,username:'CsBot_10',offline:true});

bot.on('spawn',()=>console.log('BOT ENTROU! RTP pronto'));

bot.on('text',(p)=>{
  const msg = (p.message||'').toLowerCase();
  const nick = p.source_name;
  if(!nick || nick === bot.username) return;

  if(msg.includes('morreu') || msg.includes('died')){
    mortes[nick] = { x
