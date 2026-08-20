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



    ctx.fillStyle="#5865f2";


    ctx.shadowColor="#5865f2";

    ctx.shadowBlur=20;



    ctx.beginPath();


    ctx.arc(
        iconX,
        iconY,
        58,
        0,
        Math.PI*2
    );


    ctx.fill();



    ctx.shadowBlur=0;





    ctx.fillStyle="#ffffff";


    ctx.font =
        "bold 34px DejaVuSans";


    ctx.textAlign="center";


    ctx.textBaseline="middle";


    ctx.fillText(
        "MS",
        iconX,
        iconY
    );









    // ===============================
    // PING ROW
    // ===============================


    function pingRow(
        y,
        title,
        value,
        color
    ){


        ctx.textAlign="left";


        ctx.fillStyle="#ffffff";


        ctx.font =
            "bold 22px DejaVuSans";


        ctx.fillText(
            title,
            220,
            y
        );




        // durum noktası


        ctx.fillStyle=color;


        ctx.beginPath();


        ctx.arc(
            500,
            y-6,
            7,
            0,
            Math.PI*2
        );


        ctx.fill();






        ctx.textAlign="right";


        ctx.fillStyle="#ffffff";


        ctx.font =
            "bold 28px DejaVuSans";


        ctx.fillText(
            value + " MS",
            800,
            y
        );



    }







    pingRow(
        105,
        "BOT PING",
        bot,
        bot < 100
            ? "#00e676"
            : bot < 200
                ? "#ff9800"
                : "#ff3d3d"
    );



    pingRow(
        155,
        "MESSAGE PING",
        msg,
        msg < 100
            ? "#00e676"
            : msg < 200
                ? "#ff9800"
                : "#ff3d3d"
    );



    pingRow(
        205,
        "API PING",
        api,
        api < 100
            ? "#00e676"
            : api < 200
                ? "#ff9800"
                : "#ff3d3d"
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
