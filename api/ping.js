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
    // ICON AREA
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
        60,
        0,
        Math.PI*2
    );


    ctx.fill();


    ctx.shadowBlur=0;




    ctx.fillStyle="#ffffff";


    ctx.font =
        "bold 38px DejaVuSans";


    ctx.textAlign="center";


    ctx.textBaseline="middle";


    ctx.fillText(
        "MS",
        iconX,
        iconY
    );









    // ===============================
    // TEXT
    // ===============================


    ctx.textAlign="left";



    ctx.fillStyle="#ffffff";


    ctx.font =
        "bold 38px DejaVuSans";



    ctx.fillText(
        "Ping Durumu",
        200,
        80
    );






    // STATUS


    ctx.textAlign="right";


    ctx.fillStyle="#00e676";


    ctx.font =
        "bold 18px DejaVuSans";



    ctx.fillText(
        "ONLINE",
        805,
        60
    );






    ctx.fillStyle="#ff9800";


    ctx.font =
        "bold 32px DejaVuSans";



    ctx.fillText(
        "DISCORD",
        805,
        100
    );







    // ===============================
    // PING BAR
    // ===============================


    function pingBar(
        y,
        title,
        value,
        color
    ){


        ctx.textAlign="left";


        ctx.fillStyle="#7c839b";


        ctx.font =
            "bold 16px DejaVuSans";



        ctx.fillText(
            title,
            200,
            y
        );




        ctx.fillStyle="#0d1117";


        ctx.beginPath();


        ctx.roundRect(
            200,
            y+18,
            500,
            22,
            6
        );


        ctx.fill();





        let width =
            Math.max(
                15,
                Math.min(
                    500,
                    value * 3
                )
            );



        ctx.fillStyle=color;


        ctx.beginPath();


        ctx.roundRect(
            200,
            y+18,
            width,
            22,
            6
        );


        ctx.fill();






        ctx.textAlign="right";


        ctx.fillStyle="#ffffff";


        ctx.font =
            "bold 20px DejaVuSans";


        ctx.fillText(
            value+" MS",
            805,
            y+30
        );


    }






    pingBar(
        140,
        "BOT PING",
        bot,
        "#ff9800"
    );


    pingBar(
        175,
        "MESSAGE PING",
        msg,
        "#5865f2"
    );


    pingBar(
        210,
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
