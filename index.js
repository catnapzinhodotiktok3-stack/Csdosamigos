const bedrock = require('bedrock-protocol');
function createBot() {
  console.log('Tentando conectar...');
  const client = bedrock.createClient({
    host: 'CsDosAmigos-k6LW.aternos.me',
    port: 62990,
    username: 'Bott',
    offline: true
  });
  client.on('spawn', () => console.log('BOT ENTROU! ✅'));
  client.on('disconnect', () => setTimeout(createBot, 5000));
  client.on('error', (e) => {
    console.log('Erro:', e.message);
    setTimeout(createBot, 5000);
  });
}
createBot();
require('http').createServer((_,res)=>res.end('ok')).listen(process.env.PORT||10000);
