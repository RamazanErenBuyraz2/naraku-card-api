const {
    createCanvas,
    loadImage,
    GlobalFonts
} = require("@napi-rs/canvas");

const path = require("path");


// FONT LOAD

const FONT_PATH = path.join(
    process.cwd(),
    "fonts",
    "DejaVuSans.ttf"
);

try {
    GlobalFonts.registerFromPath(
        FONT_PATH,
        "DejaVu"
    );
} catch (err) {
    console.log(
        "Font yükleme hatası:",
        err.message
    );
}



function roundRect(
    ctx,
    x,
    y,
    w,
    h,
    r,
    color
) {

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



function clamp(
    value,
    min,
    max
){

    return Math.min(
        Math.max(value,min),
        max
    );

}



module.exports = async (req,res)=>{


    const username =
        String(
            req.query.username || "Unknown"
        );


    const avatar =
        String(
            req.query.avatar || ""
        );


    const level =
        Number(
            req.query.level || 1
        );


    const xp =
        Number(
            req.query.xp || 0
        );


    const nextXP =
        Number(
            req.query.nextXP || 100
        );


    const rank =
        Number(
            req.query.rank || 1
        );



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

    roundRect(
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



    // AVATAR

    if(avatar){

        try{

            const img =
                await loadImage(
                    avatar
                );


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


        }catch(e){

            console.log(
                e.message
            );

        }

    }




    // USERNAME

    ctx.fillStyle="#ffffff";

    ctx.font =
        "bold 32px DejaVu";


    ctx.fillText(
        username,
        200,
        95
    );




    // RANK

    ctx.fillStyle="#9ca3af";

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
        "bold 26px DejaVu";


    ctx.fillText(
        `SEVİYE ${level}`,
        650,
        105
    );




    // XP BAR

    const barX=200;
    const barY=150;
    const barW=600;
    const barH=28;



    roundRect(
        ctx,
        barX,
        barY,
        barW,
        barH,
        15,
        "#292d39"
    );



    const progress =
        clamp(
            xp / nextXP,
            0,
            1
        );



    const fill =
        Math.max(
            10,
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
        0.5,
        "#ffb000"
    );


    gradient.addColorStop(
        1,
        "#ff4d4d"
    );



    ctx.fillStyle =
        gradient;


    ctx.beginPath();

    ctx.roundRect(
        barX,
        barY,
        fill,
        barH,
        15
    );

    ctx.fill();




    // XP TEXT

    ctx.fillStyle="#ffffff";

    ctx.font =
        "bold 22px DejaVu";


    ctx.fillText(
        `${xp.toLocaleString()} / ${nextXP.toLocaleString()} XP`,
        200,
        220
    );




    // NEXT LEVEL

    ctx.fillStyle="#9ca3af";

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
