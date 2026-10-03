const { createClient } = require('bedrock-protocol')
const express = require('express')

const HOST = 'CsDosAmigos-k6LW.aternos.me'
const PORT = 62990

const app = express()
app.get('/', (req,res) => res.send('Bot pulando!'))
app.listen(process.env.PORT || 10000, () => console.log('Site live'))

function pular(bot){
  try{
    const pos = bot.entity.position
    bot.write('move_player', {
      runtime_id: bot.entity.runtimeId,
      position: { x: pos.x, y: pos.y + 0.6, z: pos.z },
      pitch:0, yaw:0, head_yaw:0, mode:0, on_ground:false, ridden_runtime_id:0, teleport:false
    })
    setTimeout(()=> {
      try{ bot.write('move_player', {
        runtime_id: bot.entity.runtimeId, position: pos,
        pitch:0, yaw:0, head_yaw:0, mode:0, on_ground:true, ridden_runtime_id:0, teleport:false
      })}catch{}
    },300)
    console.log('PULOU!')
  }catch{}
}

function entra(){
  const bot = createClient({
    host: HOST, port: PORT,
    username: 'CsBot_10',
    offline: true
  })

  bot.on('spawn', ()=>{
    console.log('✅ ENTREI - PULANDO')
    // pula sozinho
    setInterval(()=> pular(bot), 3500)
    // sai em 10min e volta em 90s - anti ban Aternos
    setTimeout(()=> bot.close(), 10*60*1000)
  })

  // quando você fala "pula" no chat
  bot.on('text', (p)=>{
    const msg = (p.message || '').toLowerCase()
    console.log('CHAT:', p.message)
    if(msg.includes('p
