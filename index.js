const { createClient } = require('bedrock-protocol')
const express = require('express')

const HOST = 'CsDosAmigos-k6LW.aternos.me'
const PORT = 62990

// --- SITE FAKE PRO RENDER NÃO DERRUBAR ---
const app = express()
app.get('/', (req, res) => {
  res.send('Bot CsDosAmigos Bedrock pulando 24h! 💜')
})
const RENDER_PORT = process.env.PORT || 10000
app.listen(RENDER_PORT, () => {
  console.log(`[b712d] Site na porta ${RENDER_PORT}`)
})

function entra() {
  console.log(`Entrando no Bedrock ${HOST}:${PORT}`)
  const bot = createClient({
    host: HOST,
    port: PORT,
    username: 'CsBot_' + Math.floor(Math.random() * 89 + 10),
    offline: true, // Bedrock pirata / Aternos
    version: '1.21.93' // compatível com seu servidor 1.26.51
  })

  let pulaInterval = null

  bot.on('connect', () => {
    console.log(`Connecting to ${HOST}:${PORT}`)
  })

  bot.on('spawn', () => {
    console.log(`✅ ENTREI! Bem-vindo ao servidor! Pulando...`)

    // PULA a cada 3.5s pra não tomar kick AFK
    pulaInterval = setInterval(() => {
      try {
        bot.write('move_player', {
          runtime_id: bot.entity.runtimeId,
          position: bot.entity.position,
          pitch: 0,
          yaw: 0,
          head_yaw: 0,
          mode: 0,
          on_ground: false, // pulando
          ridden_runtime_id: 0,
          teleport: false
        })
        // volta pro chão depois de 200ms
        setTimeout(() => {
          try {
            bot.write('move_player', {
              runtime_id: bot.entity.runtimeId,
              position: bot.entity.position,
              pitch: 0, yaw: 0, head_yaw: 0, mode: 0,
              on_ground: true,
              ridden_runtime_id: 0,
              teleport: false
            })
          } catch {}
        }, 200)
      } catch (e) {}
    }, 3500)

    // Fica 10 minutos online e sai pra não tomar ban do Aternos
    setTimeout(() => {
      console.log('Saindo pra evitar ban...')
      clearInterval(pulaInterval)
      bot.close()
    }, 10 * 60 * 1000)
  })

  bot.on('text', (packet) => {
    // mostra chat do servidor no log se quiser
    // console.log('CHAT:', packet.message)
  })

  bot.on('close', () => {
    if (pulaInterval) clearInterval(pulaInterval)
    console.log('Desconectou. Voltando em 50s...')
    setTimeout(entra, 50000) // 50s offline = anti-ban
  })

  bot.on('error', (err) => {
    console.log('Erro:', err.message)
    if (pulaInterval) clearInterval(pulaInterval)
    setTimeout(entra, 60000)
  })
}

entra()
