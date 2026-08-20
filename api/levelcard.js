const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");


// FONT
try {
    GlobalFonts.registerFromPath(
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "DejaVu"
    );
} catch {}



function box(ctx,x,y,w,h,r,color){

    ctx.fillStyle = color;

    ctx.beginPath();

    ctx.roundRect(
        x,
        y,
        w,
        h,
        r
    );

    ctx.fill();
}



function clamp(v,min,max){
    return Math.min(
        Math.max(v,min),
        max
    );
}



module.exports = async (req,res)=>{


    const username =
        String(req.query.username || "Unknown");


    const avatar =
        req.query.avatar || "";


    const level =
        Number(req.query.level || 1);


    const xp =
        Number(req.query.xp || 0);


    const nextXP =
        Number(req.query.nextXP || 100);


    const rank =
        Number(req.query.rank || 1);



    const canvas =
        createCanvas(
            900,
            280
        );


    const ctx =
        canvas.getContext("2d");



    // BACKGROUND

    ctx.fillStyle="#07080c";

    ctx.fillRect(
        0,
        0,
        900,
        280
    );



    // CARD

    box(
        ctx,
        20,
        20,
        860,
        240,
        25,
        "#12141b"
    );



    // AVATAR RING

    ctx.beginPath();

    ctx.arc(
        110,
        140,
        62,
        0,
        Math.PI*2
    );


    ctx.fillStyle="#ff9800";

    ctx.fill();



    if(avatar){

        try{

            const img =
                await loadImage(avatar);


            ctx.save();


            ctx.beginPath();

            ctx.arc(
                110,
                140,
                55,
                0,
                Math.PI*2
            );


            ctx.clip();


            ctx.drawImage(
                img,
                55,
                85,
                110,
                110
            );


            ctx.restore();


        }catch(err){

            console.log(
                "Avatar yüklenemedi"
            );

        }

    }



    // USERNAME

    ctx.fillStyle="#ffffff";

    ctx.font =
        "32px DejaVu";


    ctx.fillText(
        username,
        200,
        95
    );



    // RANK

    ctx.fillStyle="#b0b5c5";

    ctx.font =
        "20px DejaVu";


    ctx.fillText(
        `SIRA #${rank}`,
        700,
        65
    );



    // LEVEL

    ctx.fillStyle="#ff9800";

    ctx.font =
        "26px DejaVu";


    ctx.fillText(
        `SEVİYE ${level}`,
        700,
        105
    );



    // XP BAR

    const barX=200;
    const barY=150;
    const barW=600;
    const barH=28;


    box(
        ctx,
        barX,
        barY,
        barW,
        barH,
        15,
        "#252936"
    );



    const progress =
        clamp(
            xp / nextXP,
            0,
            1
        );



    const width =
        Math.max(
            5,
            barW * progress
        );



    const gradient =
        ctx.createLinearGradient(
            barX,
            0,
            barX+barW,
            0
        );


    gradient.addColorStop(
        0,
        "#ff8a00"
    );


    gradient.addColorStop(
        1,
        "#ff2d55"
    );


    ctx.fillStyle =
        gradient;


    ctx.beginPath();


    ctx.roundRect(
        barX,
        barY,
        width,
        barH,
        15
    );


    ctx.fill();




    // XP TEXT

    ctx.fillStyle="#ffffff";

    ctx.font =
        "22px DejaVu";


    ctx.fillText(
        `${xp} / ${nextXP} XP`,
        200,
        220
    );



    // NEXT XP

    ctx.fillStyle="#9aa0b5";

    ctx.font =
        "18px DejaVu";


    ctx.fillText(
        `Sonraki seviye için ${Math.max(nextXP-xp,0)} XP gerekli`,
        200,
        245
    );



    res.setHeader(
        "Content-Type",
        "image/png"
    );


    res.send(
        canvas.toBuffer("image/png")
    );

};
