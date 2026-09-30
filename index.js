const bedrock = require('bedrock-protocol')
require('http').createServer((req,res)=>res.end('Bot ON')).listen(process.env.PORT || 3000)

const HOST = 'CsDosAmigos-k6LW.aternos.me'
const PORT = 62990
const NICK = 'davimiguel'

function criarBot(){
  console.log('Conectando BEDROCK em '+HOST+':'+PORT)
  const client = bedrock.createClient({
    host: HOST,
    port: PORT,
    username: NICK,
    offline: true
  })

  client.on('spawn', ()=>{
    console.log('BOT ENTROU E VAI PULAR! ✅')
    
    // Anti-AFK pulando a cada 15s
    setInterval(()=>{
      try{
        client.write('text', { type: 'chat', needs_translation: false, source_name: '', xuid: '', platform_chat_id: '', message: '' })
        // pulo
        client.queue('player_auth_input', {
          pitch: 0,
          yaw: 0,
          position: client.entity?.position || {x:0,y:0,z:0},
          move_vector: {x:0, z:0},
          head_yaw: 0,
          input_data: { _value: 0x80 }, // jump
          input_mode: 'mouse',
          play_mode: 'screen',
          tick: 0n,
          delta: {x:0,y:0,z:0}
        })
        console.log('Pulou!')
      }catch(e){}
    }, 15000)
  })

  client.on('close', ()=>{
    console.log('Caiu, reconectando 10s...')
    setTimeout(criarBot, 10000)
  })

  client.on('error', (e)=>console.log('Erro:', e.message))
}
criarBot()
