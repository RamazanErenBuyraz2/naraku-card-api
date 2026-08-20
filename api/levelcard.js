const { createCanvas, loadImage } = require("@napi-rs/canvas");

function roundRect(ctx, x, y, w, h, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

module.exports = async (req, res) => {

    const username = req.query.username || "Unknown";
    const avatar = req.query.avatar || "";

    const level = Math.max(1, Number(req.query.level || 1));
    const xp = Math.max(0, Number(req.query.xp || 0));
    const nextXP = Math.max(1, Number(req.query.nextXP || 100));
    const rank = Math.max(1, Number(req.query.rank || 1));


    const WIDTH = 900;
    const HEIGHT = 280;


    const canvas = createCanvas(WIDTH, HEIGHT);
    const ctx = canvas.getContext("2d");


    // BACKGROUND

    ctx.fillStyle = "#08090d";
    ctx.fillRect(0,0,WIDTH,HEIGHT);



    // OUTER CARD

    roundRect(
        ctx,
        25,
        25,
        850,
        230,
        25,
        "#252938"
    );


    // INNER CARD

    roundRect(
        ctx,
        35,
        35,
        830,
        210,
        20,
        "#11131a"
    );



    // AVATAR

    const avatarX = 55;
    const avatarY = 75;
    const size = 110;


    ctx.beginPath();
    ctx.arc(
        avatarX + size/2,
        avatarY + size/2,
        62,
        0,
        Math.PI*2
    );

    ctx.fillStyle="#ff9d00";
    ctx.shadowColor="#ff9d00";
    ctx.shadowBlur=20;
    ctx.fill();


    ctx.shadowBlur=0;


    if(avatar){

        try{

            const img = await loadImage(avatar);

            ctx.save();

            ctx.beginPath();

            ctx.arc(
                avatarX + size/2,
                avatarY + size/2,
                55,
                0,
                Math.PI*2
            );

            ctx.clip();


            ctx.drawImage(
                img,
                avatarX,
                avatarY,
                size,
                size
            );


            ctx.restore();


        }catch{}

    }




    // USERNAME

    ctx.fillStyle="#ffffff";
    ctx.font="32px sans-serif";

    ctx.fillText(
        username,
        200,
        90
    );



    // RANK

    ctx.fillStyle="#9aa0b5";
    ctx.font="20px sans-serif";

    ctx.fillText(
        `SIRA #${rank}`,
        700,
        65
    );



    // LEVEL

    ctx.fillStyle="#ff9d00";
    ctx.font="26px sans-serif";

    ctx.fillText(
        `SEVİYE ${level}`,
        700,
        105
    );




    // XP BAR

    const barX = 200;
    const barY = 150;
    const barW = 600;
    const barH = 28;


    roundRect(
        ctx,
        barX,
        barY,
        barW,
        barH,
        15,
        "#292d39"
    );



    const progress = clamp(
        xp / nextXP,
        0,
        1
    );


    const fillW = Math.max(
        10,
        barW * progress
    );



    // GRADIENT XP

    const gradient =
        ctx.createLinearGradient(
            barX,
            0,
            barX + barW,
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
        "#9b5cff"
    );



    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.roundRect(
        barX,
        barY,
        fillW,
        barH,
        15
    );

    ctx.fill();



    // DRAGON ICON

    const dragonX =
        barX + fillW;

    const dragonY =
        barY + barH/2;


    ctx.fillStyle="#ffffff";

    ctx.beginPath();

    ctx.arc(
        dragonX,
        dragonY,
        12,
        0,
        Math.PI*2
    );

    ctx.fill();


    ctx.fillStyle="#ff8a00";

    ctx.beginPath();

    ctx.moveTo(
        dragonX-8,
        dragonY-8
    );

    ctx.lineTo(
        dragonX-22,
        dragonY-18
    );

    ctx.lineTo(
        dragonX-15,
        dragonY+5
    );

    ctx.fill();




    // XP TEXT

    ctx.fillStyle="#ffffff";

    ctx.font="22px sans-serif";


    ctx.fillText(
        `${xp.toLocaleString()} / ${nextXP.toLocaleString()} XP`,
        200,
        220
    );



    // NEXT LEVEL

    ctx.fillStyle="#9aa0b5";

    ctx.font="18px sans-serif";


    ctx.fillText(
        `Sonraki seviye için ${Math.max(nextXP-xp,0)} XP gerekli`,
        500,
        220
    );



    res.setHeader(
        "Content-Type",
        "image/png"
    );


    res.send(
        canvas.toBuffer("image/png")
    );

};
