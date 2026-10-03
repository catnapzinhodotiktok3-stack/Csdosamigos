const { createClient } = require('bedrock-protocol');
const express = require('express');
const app = express();
app.get('/',(r,s)=>s.send('ok'));
app.listen(process.env.PORT||10000,()=>console.log('SITE ON'));

function entra(){
console.log('Conectando no Aternos...');
const bot = createClient({host:'CsDosAmigos-k6LW.aternos.me',port:62990,username:'CsBot_10',offline:true});
bot.on('spawn',()=>{
console.log('ENTREI 1/20 NO ATERNOS!!!');
setInterval(()=>{
try{
const p=bot.entity.position;
bot.write('move_player',{runtime_id:bot.entity.runtimeId,position:{x:p.x,y:p.y+0.7,z:p.z},pitch:0,yaw:0,head_yaw:0,mode:0,on_ground:false,ridden_runtime_id:0
