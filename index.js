const bedrock = require('bedrock-protocol')
require('http').createServer((req,res)=>res.end('Bot ON')).listen(process.env.PORT || 3000)

const HOST = 'CsDosAmigos-k6LW.aternos.me'
const PORT = 62990
const NICK = 'Tiracatnap'

function criarBot(){
  console.log('Conectando em '+HOST+':'+PORT)
  const client = bedrock.createClient({
    host: HOST,
    port: PORT,
    username: NICK,
    offline: true
  })

  client.on('spawn', ()=>{
    console.log('BOT BEDROCK ENTROU! ✅')
  })

  client.on('close', ()=>{
    console.log('Caiu, reconectando em 10s...')
    setTimeout(criarBot, 10000)
  })

  client.on('error', (e)=>{
    console.log('Erro:', e.message)
  })
}

criarBot()
