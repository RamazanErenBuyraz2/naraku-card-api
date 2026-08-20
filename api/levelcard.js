const {
    createCanvas,
    loadImage,
    GlobalFonts
} = require("@napi-rs/canvas");

const path = require("path");


// ===============================
// FONT
// ===============================

try {

    GlobalFonts.registerFromPath(
        path.join(
            process.cwd(),
            "fonts",
            "DejaVuSans.ttf"
        ),
        "DejaVuSans"
    );

} catch (err) {

    console.log(
        "Font hatası:",
        err.message
    );

}



// ===============================
// API
// ===============================

module.exports = async (req, res) => {


    const canvas = createCanvas(
        900,
        270
    );


    const ctx = canvas.getContext("2d");



    // ===============================
    // PARAMETRELER
    // ===============================

    const username =
        String(
            req.query.username || "erenbuyraz06"
        );


    const level =
        Number(
            req.query.level || 1
        );


    const rank =
        Number(
            req.query.rank || 1
        );


    const xp =
        Number(
            req.query.xp || 762
        );


    const nextXP =
        Number(
            req.query.nextXP || 6000
        );


    const avatarUrl =
        String(
            req.query.avatar || ""
        );



    const progress =
        Math.max(
            0,
            Math.min(
                1,
                xp / nextXP
            )
        );



    // ===============================
    // BACKGROUND
    // ===============================

    ctx.fillStyle="#0c0d10";

    ctx.fillRect(
        0,
        0,
        900,
        270
    );



    // ===============================
    // CARD
    // ===============================

    ctx.fillStyle="#12141d";

    ctx.beginPath();

    ctx.roundRect(
        30,
        25,
        840,
        220,
        18
    );

    ctx.fill();




    // ===============================
    // AVATAR
    // ===============================

    const avatarX = 115;
    const avatarY = 135;
    const avatarR = 60;



    ctx.save();


    ctx.shadowColor="#4d42ec";
    ctx.shadowBlur=20;

    ctx.strokeStyle="#5b51f5";
    ctx.lineWidth=5;


    ctx.beginPath();

    ctx.arc(
        avatarX,
        avatarY,
        avatarR+3,
        0,
        Math.PI*2
    );

    ctx.stroke();


    ctx.restore();



    if(avatarUrl){

        try{

            const img =
                await loadImage(
                    avatarUrl
                );


            ctx.save();


            ctx.beginPath();

            ctx.arc(
                avatarX,
                avatarY,
                avatarR,
                0,
                Math.PI*2
            );


            ctx.clip();


            ctx.drawImage(
                img,
                avatarX-avatarR,
                avatarY-avatarR,
                avatarR*2,
                avatarR*2
            );


            ctx.restore();


        }catch(e){

            console.log(
                "Avatar:",
                e.message
            );

        }

    }



    // ===============================
    // TEXT
    // ===============================

    ctx.textBaseline="middle";



    // USERNAME

    ctx.fillStyle="#ffffff";

    ctx.font=
        "bold 38px DejaVuSans";


    ctx.textAlign="left";


    ctx.fillText(
        username,
        200,
        80
    );



    // RANK

    ctx.fillStyle="#7c839b";

    ctx.font=
        "bold 18px DejaVuSans";


    ctx.textAlign="right";


    ctx.fillText(
        `SIRA #${rank}`,
        805,
        60
    );



    // LEVEL

    ctx.fillStyle="#ff9800";

    ctx.font=
        "bold 32px DejaVuSans";


    ctx.fillText(
        `SEVİYE ${level}`,
        805,
        100
    );





    // ===============================
    // XP BAR
    // ===============================


    const barX=200;
    const barY=145;
    const barW=605;
    const barH=34;



    ctx.fillStyle="#0d1117";


    ctx.beginPath();

    ctx.roundRect(
        barX,
        barY,
        barW,
        barH,
        6
    );

    ctx.fill();




    const fillW =
        Math.max(
            12,
            barW*progress
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
        "#ff3b00"
    );


    gradient.addColorStop(
        .5,
        "#ff8800"
    );


    gradient.addColorStop(
        1,
        "#ffcc00"
    );



    ctx.fillStyle=gradient;


    ctx.beginPath();


    ctx.roundRect(
        barX,
        barY,
        fillW,
        barH,
        6
    );


    ctx.fill();




    // ===============================
    // DRAGON
    // ===============================


    const dragonX =
        barX + fillW - 5;


    const dragonY =
        barY + barH/2;



    ctx.fillStyle="#ff1a00";


    ctx.beginPath();

    ctx.arc(
        dragonX,
        dragonY,
        18,
        0,
        Math.PI*2
    );

    ctx.fill();



    ctx.fillStyle="#ffffff";


    ctx.beginPath();

    ctx.arc(
        dragonX+7,
        dragonY-4,
        3,
        0,
        Math.PI*2
    );

    ctx.fill();




    // ===============================
    // XP TEXT
    // ===============================


    ctx.fillStyle="#ffffff";

    ctx.font=
        "bold 20px DejaVuSans";


    ctx.textAlign="right";


    ctx.fillText(
        `${xp.toLocaleString("tr-TR")} / ${nextXP.toLocaleString("tr-TR")} XP`,
        805,
        205
    );



    // ===============================
    // RESPONSE
    // ===============================


    res.setHeader(
        "Content-Type",
        "image/png"
    );


    res.setHeader(
        "Cache-Control",
        "no-cache"
    );


    res.send(
        canvas.toBuffer("image/png")
    );


};
