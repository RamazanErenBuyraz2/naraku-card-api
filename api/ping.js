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







    ctx.textBaseline="middle";




    // ===============================
    // HEADER
    // ===============================


    ctx.fillStyle="#ffffff";


    ctx.font =
        "bold 38px DejaVuSans";


    ctx.textAlign="left";


    ctx.fillText(
        "Ping Durumu",
        70,
        75
    );





    ctx.fillStyle="#8b93ad";


    ctx.font =
        "18px DejaVuSans";


    ctx.fillText(
        "Discord bağlantı gecikmesi",
        70,
        112
    );







    // ===============================
    // STATUS
    // ===============================


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


    ctx.font =
        "bold 16px DejaVuSans";


    ctx.textAlign="right";


    ctx.fillText(
        "ONLINE",
        750,
        80
    );







    // ===============================
    // STATUS LINE
    // ===============================


    function pingLine(
        y,
        title,
        value
    ){


        let color =
            value <= 100
            ? "#00e676"
            :
            value <= 250
            ? "#ff9800"
            :
            "#ff3d3d";




        ctx.textAlign="left";


        ctx.fillStyle="#8f96ad";


        ctx.font =
            "bold 16px DejaVuSans";


        ctx.fillText(
            title,
            70,
            y
        );




        ctx.textAlign="right";


        ctx.fillStyle=color;


        ctx.font =
            "bold 20px DejaVuSans";


        ctx.fillText(
            value+" MS",
            820,
            y
        );






        // BAR


        ctx.fillStyle="#0d1117";


        ctx.beginPath();


        ctx.roundRect(
            70,
            y+18,
            750,
            10,
            5
        );


        ctx.fill();




        ctx.fillStyle=color;


        ctx.beginPath();


        ctx.roundRect(
            70,
            y+18,
            Math.min(
                750,
                Math.max(
                    40,
                    value*2
                )
            ),
            10,
            5
        );


        ctx.fill();



    }







    pingLine(
        145,
        "BOT GECİKMESİ",
        bot
    );


    pingLine(
        185,
        "MESAJ GECİKMESİ",
        msg
    );


    pingLine(
        225,
        "API GECİKMESİ",
        api
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
