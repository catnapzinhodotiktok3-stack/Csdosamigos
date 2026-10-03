const { createClient } = require('bedrock-protocol')
const express = require('express')

const HOST = 'CsDosAmigos-k6LW.aternos.me'
const PORT = 62990

// CORREÇÃO DO ERRO "No open ports detected"
const app = express()
app.get('/', (req,res)=> res.send('Bot Bedrock CsDosAmigos pulando!'))
const RENDER_PORT = process.env.PORT || 10000
app.listen(RENDER_PORT, ()=> console.log('Site na porta '+RENDER_PORT))

function entra(){
  console.log('Entrando no Bedrock '+HOST+':'+PORT)
  const bot = createClient({
    host: HOST,
    port: PORT,
    username: 'CsBot_' + Math.floor(Math.random()*90),
    offline: true
  })

  bot.on('spawn', ()=>{
    console.log('✅ ENTREI! Pulando...')
    const pula = setInterval(()=>{
      try{
        // faz pular
        bot.write('move_player', {
          runtime_id: bot.entity.runtimeId,
          position: bot.entity.position,
          pitch: 0, yaw: 0, head_yaw: 0,
          mode: 0,
          on_ground: false,
          ridden_runtime_id: 0,
          teleport: false
        })
      }catch(e){}
    }, 3500)

    setTimeout(()=>{
      clearInterval(pula)
      console.log('Saindo...')
      bot.close()
    }, 10*60*1000) // 10 min online
  })

  bot.on('close', ()=> setTimeout(entra, 50000))
  bot.on('error', e=> {
    console.log('Erro:', e.message)
    setTimeout(entra, 60000)
  })
}

entra()
