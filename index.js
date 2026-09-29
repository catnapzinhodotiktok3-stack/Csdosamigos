const bedrock = require('bedrock-protocol')
function createBot() {
  const client = bedrock.createClient({
    host: 'CsDosAmigos-k6LW.aternos.me',
    port: 62990,
    username: 'Bott',
    offline: true
  })
  client.on('spawn', () => console.log('Bot Bedrock conectou!'))
  client.on('disconnect', (r) => { console.log('Caiu', r); setTimeout(createBot, 10000) })
  client.on('error', (e) => console.log(e))
}
createBot()
require('http').createServer((req,res)=>res.end('online')).listen(process.env.PORT || 3000)
