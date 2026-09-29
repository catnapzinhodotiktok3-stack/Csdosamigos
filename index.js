const { createClient } = require('bedrock-protocol');

const HOST = 'CsDosAmigos-k6LW.aternos.me';
const PORT = 62990;

function start() {
  console.log('Conectando...');
  const client = createClient({
    host: HOST,
    port: PORT,
    username: 'Bott',
    offline: true
  });

  let intervalo;

  client.on('spawn', () => {
    console.log('BOT ENTROU! ✅');
    
    // Fica pulando a cada 20 segundos pra não tomar kick
    intervalo = setInterval(() => {
      client.write('player_auth_input', {
        pitch: 0, yaw: 0,
        position: { x: 0, y: 0, z: 0 },
        move_vector: { x: 0, z: 0 },
        head_yaw: 0,
        input_data: { _value: 0n, is_jumping: true },
        input_mode: 'mouse',
        play_mode: 'normal',
        tick: 0n,
        delta: { x: 0, y: 0, z: 0 }
      });
      console.log('Pulou!');
    }, 20000); // 20 segundos
  });

  client.on('close', () => {
    clearInterval(intervalo);
    console.log('Caiu, reconectando em 10s...');
    setTimeout(start, 10000);
  });

  client.on('error', (e) => {
    clearInterval(intervalo);
    console.log('Erro:', e.message);
    setTimeout(start, 10000);
  });
}

start();
