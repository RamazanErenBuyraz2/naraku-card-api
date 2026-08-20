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

    ctx.save();

    ctx.shadowColor="#5865f2";
    ctx.shadowBlur=25;


    ctx.fillStyle="#5865f2";


    ctx.beginPath();

    ctx.arc(
        120,
        135,
        58,
        0,
        Math.PI*2
    );

    ctx.fill();


    ctx.restore();



    ctx.fillStyle="#fff";

    ctx.font=
        "bold 34px DejaVuSans";


    ctx.textAlign="center";

    ctx.textBaseline="middle";


    ctx.fillText(
        "MS",
        120,
        135
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
        210,
        75
    );



    ctx.fillStyle="#8b93ad";

    ctx.font=
        "18px DejaVuSans";


    ctx.fillText(
        "Sunucu gecikme değerleri",
        210,
        110
    );







    // ===============================
    // PING CARD
    // ===============================


    function drawPing(
        y,
        title,
        value,
        color
    ){


        // container

        ctx.fillStyle="#181c27";


        ctx.beginPath();

        ctx.roundRect(
            210,
            y,
            580,
            38,
            10
        );

        ctx.fill();




        // küçük durum ışığı


        ctx.fillStyle=color;


        ctx.beginPath();

        ctx.arc(
            235,
            y+19,
            6,
            0,
            Math.PI*2
        );

        ctx.fill();




        // başlık


        ctx.textAlign="left";


        ctx.fillStyle="#c5cada";

        ctx.font=
            "bold 15px DejaVuSans";


        ctx.fillText(
            title,
            255,
            y+20
        );





        // değer


        ctx.textAlign="right";


        ctx.fillStyle="#ffffff";

        ctx.font=
            "bold 18px DejaVuSans";


        ctx.fillText(
            value+" MS",
            770,
            y+20
        );


    }





    drawPing(
        140,
        "BOT PING",
        bot,
        "#ff9800"
    );


    drawPing(
        183,
        "MESSAGE PING",
        msg,
        "#5865f2"
    );


    drawPing(
        226,
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
