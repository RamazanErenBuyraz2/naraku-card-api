const {
    createCanvas
} = require("@napi-rs/canvas");



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



    // =========================
    // BACKGROUND
    // =========================


    ctx.fillStyle="#08090f";

    ctx.fillRect(
        0,
        0,
        900,
        270
    );



    // =========================
    // CARD GLOW
    // =========================


    ctx.save();

    ctx.shadowColor="#5865f2";
    ctx.shadowBlur=35;

    ctx.fillStyle="#11141d";

    ctx.beginPath();

    ctx.roundRect(
        30,
        25,
        840,
        220,
        22
    );

    ctx.fill();

    ctx.restore();




    // =========================
    // HEADER
    // =========================


    ctx.textBaseline="middle";


    ctx.fillStyle="#ffffff";

    ctx.font=
        "bold 38px Arial";


    ctx.textAlign="left";


    ctx.fillText(
        "Naraku Network Monitor",
        70,
        75
    );



    ctx.fillStyle="#8b93ad";

    ctx.font=
        "18px Arial";


    ctx.fillText(
        "Discord bağlantı durumu",
        70,
        112
    );




    // STATUS DOT


    ctx.fillStyle="#00e676";

    ctx.beginPath();

    ctx.arc(
        780,
        80,
        8,
        0,
        Math.PI*2
    );

    ctx.fill();



    ctx.fillStyle="#00e676";

    ctx.font=
        "bold 16px Arial";


    ctx.textAlign="right";


    ctx.fillText(
        "ONLINE",
        750,
        80
    );




    // =========================
    // BOX FUNCTION
    // =========================


    function pingBox(
        x,
        title,
        value,
        color
    ){


        ctx.fillStyle="#181c27";


        ctx.beginPath();

        ctx.roundRect(
            x,
            150,
            220,
            65,
            14
        );

        ctx.fill();



        // title

        ctx.textAlign="left";


        ctx.fillStyle="#8f96ad";

        ctx.font=
            "bold 14px Arial";


        ctx.fillText(
            title,
            x+18,
            172
        );



        // value


        ctx.fillStyle=color;

        ctx.font=
            "bold 28px Arial";


        ctx.fillText(
            value+" MS",
            x+18,
            202
        );



    }




    pingBox(
        70,
        "BOT PING",
        bot,
        "#ff9800"
    );


    pingBox(
        340,
        "MESSAGE PING",
        msg,
        "#5865f2"
    );


    pingBox(
        610,
        "API PING",
        api,
        "#00e676"
    );




    // =========================
    // FOOTER
    // =========================


    ctx.textAlign="right";


    ctx.fillStyle="#656b80";

    ctx.font=
        "15px Arial";


    ctx.fillText(
        "Automatic monitoring system",
        820,
        235
    );





    res.setHeader(
        "Content-Type",
        "image/png"
    );


    res.setHeader(
        "Cache-Control",
        "no-store"
    );


    res.send(
        canvas.toBuffer("image/png")
    );

};
