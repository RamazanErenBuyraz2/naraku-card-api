
const { createCanvas, loadImage } = require("@napi-rs/canvas");

module.exports = async (req,res)=>{
 const username=req.query.username||"Unknown";
 const level=Number(req.query.level||1);
 const xp=Number(req.query.xp||0);
 const nextXP=Number(req.query.nextXP||100);
 const avatar=req.query.avatar||"";

 const canvas=createCanvas(900,280);
 const ctx=canvas.getContext("2d");

 ctx.fillStyle="#07080C";
 ctx.fillRect(0,0,900,280);

 ctx.fillStyle="#12141A";
 ctx.beginPath();
 ctx.roundRect(20,20,860,240,20);
 ctx.fill();

 ctx.fillStyle="#fff";
 ctx.font="32px Arial";
 ctx.fillText(username,200,90);

 ctx.fillStyle="#7B82FF";
 ctx.font="22px Arial";
 ctx.fillText(`SEVİYE ${level}`,700,80);

 ctx.fillStyle="#242731";
 ctx.beginPath();
 ctx.roundRect(200,150,600,25,12);
 ctx.fill();

 ctx.fillStyle="#5B63FF";
 ctx.beginPath();
 ctx.roundRect(200,150,600*Math.min(1,xp/nextXP),25,12);
 ctx.fill();

 if(avatar){
  try{
   const img=await loadImage(avatar);
   ctx.save();
   ctx.beginPath();
   ctx.arc(100,140,55,0,Math.PI*2);
   ctx.clip();
   ctx.drawImage(img,45,85,110,110);
   ctx.restore();
  }catch{}
 }

 res.setHeader("Content-Type","image/png");
 res.send(canvas.toBuffer("image/png"));
};
