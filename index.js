const { createClient } = require('bedrock-protocol');

function start() {
  console.log('Conectando...');
  const client = createClient({
    host: 'CsDosAmigos-k6LW.aternos.me',
    port: 62990,
    username: 'Bott',
    offline: true
  });

  let jumped = 0;

  client.on('spawn', () => {
    console.log('BOT ENTROU! ✅ Pulando a cada 60s');

    setInterval(() => {
      try {
        // faz ele pular de verdade
        client.queue('player_auth_input', {
          pitch: client.entity.pitch || 0,
          yaw: client.entity.yaw || 0,
          position: client.entity.position,
          move_vector: { x: 0, z: 0 },
          head_yaw: client.entity.head_yaw || 0,
          input_data: { _value: 0n, jump_down: true, jump_down_raw: true },
          input_mode: 'mouse',
          play_mode: 'normal',
          tick: 0n,
          delta: { x: 0, y: 0, z: 0 }
        });
        jumped++;
        console.log(`Pulou ${jumped}x`);
      } catch (e) {}
    }, 60000); // 60 segundos
  });

  client.on('close', () => {
    console.log('Caiu, reconectando em 10s...');
    setTimeout(start, 10000);
  });
  client.on('error', e => console.log('Erro:', e.message));
}
start();
