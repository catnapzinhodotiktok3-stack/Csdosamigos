const { createClient } = require('bedrock-protocol');
const express = require('express');

const HOST = 'CsDosAmigos-k6LW.aternos.me';
const PORT = 62990;

const app = express();
app.get('/', (req,res)=> res.send('Bot on'));
app.listen(process.env.PORT || 10000);

function pular(bot){
  try{
    const p = bot.entity.position;
    bot.write('move_player', { runtime_id: bot.entity.runtimeId, position:{x:p.x, y:p.y+0.6, z:p.z}, pitch:0, yaw:0, head_yaw:0, mode:0, on_ground:false, ridden_runtime_id:0, teleport:false });
    setTimeout(()=>{ try{ bot.write('move_player', { runtime_id: bot.entity.runtimeId, position:p, pitch:0, yaw:0, head_yaw:0, mode:0, on_ground:true, ridden_runtime_id:0, teleport:false }); }catch{} },300);
  }catch{}
}
function entra(){
  console.log('Conectando...');
  const bot = createClient({ host: HOST, port: PORT, username: 'CsBot_10', offline: true });
  bot.on('spawn', ()=>{ console.log('SPAWN OK'); setInterval(()=> pular(bot), 3500); setTimeout(()=> bot.close(), 600000); });
  bot.on('text', (t)=>{ if((t.message||'').toLowerCase().includes('pula')) pular(bot); });
  bot.on('close', ()=> setTimeout(entra, 90000));
  bot.on('error', ()=> setTimeout(entra, 90000));
}
entra();
