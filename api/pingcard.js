
const { createCanvas } = require("@napi-rs/canvas");

module.exports = async (req,res)=>{
 const bot=Number(req.query.botPing||0);
 const msg=Number(req.query.messagePing||0);
 const api=Number(req.query.apiPing||0);

 const canvas=createCanvas(900,280);
 const ctx=canvas.getContext("2d");

 ctx.fillStyle="#07080C";
 ctx.fillRect(0,0,900,280);

 ctx.fillStyle="#12141A";
 ctx.beginPath();
 ctx.roundRect(20,20,860,240,20);
 ctx.fill();

 ctx.fillStyle="#fff";
 ctx.font="30px Arial";
 ctx.fillText("Ping Sonuçları",40,70);

 ctx.font="22px Arial";
 ctx.fillStyle="#7B82FF";
 ctx.fillText(`Bot: ${bot} MS`,60,130);
 ctx.fillText(`Mesaj: ${msg} MS`,60,170);
 ctx.fillText(`API: ${api} MS`,60,210);

 res.setHeader("Content-Type","image/png");
 res.send(canvas.toBuffer("image/png"));
};
