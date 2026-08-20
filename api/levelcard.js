const { createCanvas, loadImage } = require("@napi-rs/canvas");

module.exports = async (req, res) => {
    try {

        const username = req.query.username || "Unknown";
        const avatar = req.query.avatar || "";

        const level = Number(req.query.level || 1);
        const xp = Number(req.query.xp || 0);
        const nextXP = Number(req.query.nextXP || 100);

        const canvas = createCanvas(900, 280);
        const ctx = canvas.getContext("2d");


        // BACKGROUND
        ctx.fillStyle = "#07080C";
        ctx.fillRect(0, 0, 900, 280);


        // CARD
        ctx.fillStyle = "#12141A";
        ctx.beginPath();
        ctx.roundRect(20, 20, 860, 240, 20);
        ctx.fill();


        // AVATAR
        if (avatar) {
            try {

                const img = await loadImage(avatar);

                ctx.save();

                ctx.beginPath();
                ctx.arc(
                    100,
                    140,
                    55,
                    0,
                    Math.PI * 2
                );

                ctx.clip();

                ctx.drawImage(
                    img,
                    45,
                    85,
                    110,
                    110
                );

                ctx.restore();

            } catch {}
        }


        // USERNAME
        ctx.fillStyle = "#ffffff";
        ctx.font = "32px sans-serif";

        ctx.fillText(
            username,
            200,
            90
        );


        // LEVEL TEXT
        ctx.fillStyle = "#7B82FF";
        ctx.font = "24px sans-serif";

        ctx.fillText(
            `SEVİYE ${level}`,
            700,
            90
        );


        // XP TEXT

        ctx.fillStyle = "#AEB4C0";
        ctx.font = "20px sans-serif";

        ctx.fillText(
            `${xp} / ${nextXP} XP`,
            200,
            135
        );


        // PROGRESS BAR BACKGROUND

        ctx.fillStyle = "#242731";

        ctx.beginPath();

        ctx.roundRect(
            200,
            160,
            600,
            25,
            12
        );

        ctx.fill();



        // PROGRESS BAR

        const progress = Math.min(
            1,
            Math.max(
                0,
                xp / nextXP
            )
        );


        ctx.fillStyle = "#5B63FF";

        ctx.beginPath();

        ctx.roundRect(
            200,
            160,
            600 * progress,
            25,
            12
        );

        ctx.fill();



        // NEXT LEVEL

        ctx.fillStyle = "#8E95A5";
        ctx.font = "18px sans-serif";

        ctx.fillText(
            `Sonraki seviye için ${Math.max(nextXP - xp,0)} XP gerekli`,
            200,
            220
        );


        // FOOTER

        ctx.fillStyle = "#5865F2";
        ctx.font = "16px sans-serif";

        ctx.fillText(
            "Naraku Level System",
            700,
            230
        );



        res.setHeader(
            "Content-Type",
            "image/png"
        );

        res.send(
            canvas.toBuffer("image/png")
        );


    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Card generation failed"
        });

    }
};
