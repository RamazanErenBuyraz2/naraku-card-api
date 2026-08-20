const { createCanvas, loadImage } = require("@napi-rs/canvas");


function roundBox(ctx, x, y, w, h, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
}


function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}



module.exports = async (req, res) => {

    try {

        const username = String(req.query.username || "Unknown");
        const avatar = String(req.query.avatar || "");

        const level = Number(req.query.level || 1);
        const xp = Number(req.query.xp || 0);
        const nextXP = Number(req.query.nextXP || 100);
        const rank = Number(req.query.rank || 1);



        const canvas = createCanvas(900, 280);
        const ctx = canvas.getContext("2d");



        // BACKGROUND

        ctx.fillStyle = "#07080c";
        ctx.fillRect(0,0,900,280);



        // CARD

        roundBox(
            ctx,
            20,
            20,
            860,
            240,
            25,
            "#12141b"
        );



        // AVATAR

        ctx.beginPath();

        ctx.arc(
            110,
            140,
            62,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ff9800";
        ctx.fill();



        if(avatar){

            try{

                const img = await loadImage(avatar);


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
                    "Avatar error:",
                    e.message
                );

            }

        }



        // USERNAME

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 32px Arial";

        ctx.fillText(
            username,
            200,
            90
        );



        // RANK

        ctx.fillStyle = "#b7bccb";
        ctx.font = "20px Arial";

        ctx.fillText(
            `SIRA #${rank}`,
            700,
            65
        );



        // LEVEL

        ctx.fillStyle = "#ff9800";
        ctx.font = "bold 26px Arial";

        ctx.fillText(
            `SEVİYE ${level}`,
            650,
            105
        );




        // XP BAR

        const barX = 200;
        const barY = 150;
        const barW = 600;
        const barH = 28;


        roundBox(
            ctx,
            barX,
            barY,
            barW,
            barH,
            14,
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
            "#ff4d4d"
        );



        ctx.fillStyle = gradient;


        ctx.beginPath();

        ctx.roundRect(
            barX,
            barY,
            fillW,
            barH,
            14
        );

        ctx.fill();




        // XP TEXT

        ctx.fillStyle="#ffffff";
        ctx.font="bold 22px Arial";


        ctx.fillText(
            `${xp.toLocaleString()} / ${nextXP.toLocaleString()} XP`,
            200,
            220
        );



        // NEXT LEVEL

        ctx.fillStyle="#aab0c0";
        ctx.font="18px Arial";


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


    } catch(err){

        console.error(err);

        res.status(500).json({
            error:"card error",
            message:err.message
        });

    }

};
