const { createClient } = require('bedrock-protocol')
const express = require('express')

const HOST = 'CsDosAmigos-k6LW.aternos.me'
const PORT = 62990

const app = express()
app.get('/', (req, res) => res.send('Bot CsDosAmigos pulando 24h! 💜'))
const RENDER_PORT = process.env.PORT || 10000
app.listen(RENDER_PORT, () => console.log(`Site na porta ${RENDER_PORT}`))

function entra() {
  console.log(`Entrando no ${HOST}:${PORT}`)
  const bot = createClient({
    host: HOST,
    port: PORT,
    username: 'CsBot_' + Math.floor(Math.random() * 89 + 10),
    offline: true,
    version: '1.21.93'
  })

  let pulaInterval = null
  let chatInterval = null

  bot.on('spawn', () => {
    console.log('✅ ENTREI!')

    // PULO QUE VOCÊ MANDOU - ESSE FUNCIONA
    pulaInterval = setInterval(() => {
      try {
        const pos = bot.entity.position
        // sobe 0.5 bloco
        bot.write('move_player', {
          runtime_id: bot.entity.runtimeId,
          position: { x: pos.x, y: pos.y + 0.5, z: pos.z },
          pitch: 0, yaw: pos.yaw || 0, head_yaw: 0, mode: 0,
          on_ground: false, ridden_runtime_id: 0, teleport: false
        })
        // desce depois de 300ms
        setTimeout(() => {
          try {
            bot.write('move_player', {
              runtime_id: bot.entity.runtimeId,
              position: pos,
              pitch: 0, yaw: pos.yaw || 0, head_yaw: 0, mode: 0,
              on_ground: true, ridden_runtime_id: 0, teleport: false
            })
          } catch {}
        }, 300)
        console.log('PULOU!')
      } catch {}
    }, 3500)

    // FALA @a e todos
    chatInterval = setInterval(() => {
      try {
        bot.queue('text', {
          type: 'chat',
          needs_translation: false,
          source_name: bot.username,
          xuid: '',
          platform_chat_id: '',
          message: '@a e todos bot ativo pulando!'
        })
      } catch {}
    }, 60000)

    // Sai em 10 min pra não tomar ban
    setTimeout(() => {
      console.log('Saindo...')
      clearInterval(pulaInterval)
      clearInterval(chatInterval)
      bot.close()
    }, 10 * 60 * 1000)
  })

  bot.on('close', () => {
    if (pulaInterval) clearInterval(pulaInterval)
    if (chatInterval) clearInterval(chatInterval)
    console.log('Desconectou, voltando em 50s...')
    setTimeout(entra, 50000)
  })

  bot.on('error', (e) => {
    console.log('Erro:', e.message)
    if (pulaInterval) clearInterval(pulaInterval)
    if (chatInterval) clearInterval(chatInterval)
    setTimeout(entra, 60000)
  })
}

entra()
