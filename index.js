const { createClient } = require('bedrock-protocol')
const express = require('express')

// --- Config do seu Aternos ---
const HOST = 'CsDosAmigos-k6LW.aternos.me'
const PORT = 62990
const USERNAME = 'CsBot'

// --- Site fake pro Render não dormir ---
const app = express()
app.get('/', (req, res) => res.send('CsDosAmigos Bot online 💜 pulando!'))
app.listen(10000, () => console.log('Web server ligado'))

function entra() {
  console.log(`Tentando entrar em ${HOST}:${PORT}...`)
  const bot = createClient({
    host: HOST,
    port: PORT,
    username: USERNAME + Math.floor(Math.random() * 100), // nome aleatório pra não tomar ban
    offline: true,
    version: '1.21.51' // compatível com seu 1.26
  })

  bot.on('spawn', () => {
    console.log('✅ ENTREI! Começando a pular...')
    
    // PULA a cada 3 a 5 segundos (anti-AFK)
    const pula = setInterval(() => {
      try {
        bot.write('move_player', {
          runtime_id: bot.entity.runtimeId || 1,
          position: bot.entity.position,
          pitch: 0,
          yaw: 0,
          head_yaw: 0,
          mode: 0,
          on_ground: false, // pulando
          ridden_runtime_id: 0,
          teleport: false
        })
        // volta pro chão
        setTimeout(() => {
           bot.write('move_player', {
            runtime_id: bot.entity.runtimeId || 1,
            position: bot.entity.position,
            pitch: 0, yaw: 0, head_yaw: 0, mode: 0,
            on_ground: true,
            ridden_runtime_id: 0, teleport: false
          })
        }, 200)
      } catch(e){}
    }, 3000 + Math.random() * 2000)

    // Fica online 8 a 12 min e sai (anti-ban Aternos)
    const tempoOnline = (8 + Math.random() * 4) * 60 * 1000
    setTimeout(() => {
      clearInterval(pula)
      console.log('Saindo pra não tomar ban...')
      bot.close()
    }, tempoOnline)
  })

  bot.on('close', () => {
    const espera = 40000 + Math.random() * 30000 // 40s a 70s offline
    console.log(`Saiu. Voltando em ${Math.round(espera/1000)}s...`)
    setTimeout(entra, espera)
  })

  bot.on('error', (e) => {
    console.log('Erro:', e.message)
    setTimeout(entra, 450
