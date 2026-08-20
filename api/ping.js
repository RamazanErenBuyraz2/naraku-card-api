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


    ctx.beginPath();


    ctx.arc(
        iconX,
        iconY,
        58,
        0,
        Math.PI*2
    );


    ctx.fill();




    ctx.fillStyle="#ffffff";


    ctx.font =
        "bold 34px DejaVuSans";


    ctx.textAlign="center";


    ctx.textBaseline="middle";


    ctx.fillText(
        "PING",
        iconX,
        iconY
    );








    // ===============================
    // HEADER
    // ===============================


    ctx.textAlign="left";


    ctx.fillStyle="#ffffff";


    ctx.font =
        "bold 38px DejaVuSans";


    ctx.fillText(
        "Ping Durumu",
        200,
        75
    );





    ctx.fillStyle="#8b93ad";


    ctx.font =
        "18px DejaVuSans";


    ctx.fillText(
        "Discord bağlantı gecikmesi",
        200,
        112
    );








    // ===============================
    // STATUS
    // ===============================


    ctx.fillStyle="#00e676";


    ctx.beginPath();


    ctx.arc(
        760,
        75,
        7,
        0,
        Math.PI*2
    );


    ctx.fill();




    ctx.fillStyle="#00e676";


    ctx.font =
        "bold 17px DejaVuSans";


    ctx.textAlign="right";


    ctx.fillText(
        "ONLINE",
        730,
        75
    );








    // ===============================
    // PING BAR
    // ===============================


    function drawPing(
        y,
        title,
        value,
        color
    ){


        const maxWidth = 380;



        ctx.textAlign="left";


        ctx.fillStyle="#7c839b";


        ctx.font =
            "bold 14px DejaVuSans";


        ctx.fillText(
            title,
            200,
            y
        );





        ctx.fillStyle="#0d1117";


        ctx.beginPath();


        ctx.roundRect(
            200,
            y+12,
            maxWidth,
            14,
            7
        );


        ctx.fill();






        let percent =
            Math.min(
                1,
                value / 300
            );



        let width =
            Math.max(
                10,
                maxWidth * percent
            );





        ctx.fillStyle=color;


        ctx.beginPath();


        ctx.roundRect(
            200,
            y+12,
            width,
            14,
            7
        );


        ctx.fill();







        ctx.textAlign="right";


        ctx.fillStyle="#ffffff";


        ctx.font =
            "bold 18px DejaVuSans";



        ctx.fillText(
            value + " MS",
            805,
            y+15
        );



    }







    drawPing(
        145,
        "BOT PING",
        bot,
        "#ff9800"
    );



    drawPing(
        175,
        "MESSAGE PING",
        msg,
        "#5865f2"
    );



    drawPing(
        205,
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
