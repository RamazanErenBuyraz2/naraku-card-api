const {
    createCanvas,
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

} catch {}




// ===============================
// API
// ===============================

module.exports = async (req,res)=>{


    const canvas =
        createCanvas(
            900,
            270
        );


    const ctx =
        canvas.getContext("2d");



    const bot =
        Number(req.query.botPing || 0);


    const msg =
        Number(req.query.messagePing || 0);


    const api =
        Number(req.query.apiPing || 0);




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
    // ICON
    // ===============================


    const iconX = 115;
    const iconY = 135;


    ctx.save();


    ctx.shadowColor="#5865f2";
    ctx.shadowBlur=25;


    ctx.fillStyle="#5865f2";


    ctx.beginPath();

    ctx.arc(
        iconX,
        iconY,
        58,
        0,
        Math.PI*2
    );

    ctx.fill();


    ctx.restore();



    ctx.fillStyle="#fff";

    ctx.font=
        "bold 32px DejaVuSans";


    ctx.textAlign="center";

    ctx.textBaseline="middle";


    ctx.fillText(
        "MS",
        iconX,
        iconY
    );





    // ===============================
    // TITLE
    // ===============================


    ctx.textAlign="left";


    ctx.fillStyle="#ffffff";

    ctx.font=
        "bold 38px DejaVuSans";


    ctx.fillText(
        "Ping",
        200,
        80
    );



    ctx.fillStyle="#7c839b";

    ctx.font=
        "18px DejaVuSans";


    ctx.fillText(
        "Gecikme değerleri",
        200,
        112
    );





    // ===============================
    // PING ITEM
    // ===============================


    function pingItem(
        y,
        title,
        value,
        color
    ){


        ctx.textAlign="left";


        ctx.fillStyle="#8b93ad";

        ctx.font=
            "bold 15px DejaVuSans";


        ctx.fillText(
            title,
            200,
            y
        );



        // küçük noktalar

        const total = 8;

        const active =
            Math.min(
                total,
                Math.max(
                    1,
                    Math.floor(
                        value / 50
                    )
                )
            );



        for(
            let i = 0;
            i < total;
            i++
        ){

            ctx.fillStyle =
                i < active
                ? color
                : "#242938";


            ctx.beginPath();

            ctx.roundRect(
                320 + (i * 38),
                y - 10,
                28,
                10,
                5
            );

            ctx.fill();

        }





        ctx.textAlign="right";


        ctx.fillStyle="#ffffff";

        ctx.font=
            "bold 20px DejaVuSans";


        ctx.fillText(
            value + " MS",
            805,
            y
        );

    }





    pingItem(
        150,
        "BOT PING",
        bot,
        "#ff9800"
    );


    pingItem(
        185,
        "MESSAGE PING",
        msg,
        "#5865f2"
    );


    pingItem(
        220,
        "API PING",
        api,
        "#00e676"
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
