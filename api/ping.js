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

} catch (err) {

    console.log(
        "Font yüklenemedi:",
        err.message
    );

}


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



    // ===============================
    // VALUES
    // ===============================

    const botPing =
        Number(
            req.query.botPing || 0
        );


    const messagePing =
        Number(
            req.query.messagePing || 0
        );


    const apiPing =
        Number(
            req.query.apiPing || 0
        );



    // ===============================
    // BACKGROUND
    // ===============================

    ctx.fillStyle="#08090d";

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
        20
    );

    ctx.fill();



    // ===============================
    // TITLE
    // ===============================

    ctx.textBaseline="middle";


    ctx.fillStyle="#ffffff";

    ctx.font=
        "bold 38px DejaVuSans";


    ctx.textAlign="left";


    ctx.fillText(
        "Naraku Ping",
        70,
        75
    );



    // ===============================
    // STATUS
    // ===============================

    ctx.fillStyle="#54ff8b";

    ctx.font=
        "bold 18px DejaVuSans";


    ctx.fillText(
        "● Sistem aktif",
        70,
        110
    );



    // ===============================
    // BOX FUNCTION
    // ===============================


    function box(
        x,
        y,
        title,
        value,
        color
    ){

        ctx.fillStyle="#1b1f2b";

        ctx.beginPath();

        ctx.roundRect(
            x,
            y,
            220,
            80,
            14
        );

        ctx.fill();



        ctx.fillStyle="#9aa0b5";

        ctx.font=
            "bold 16px DejaVuSans";


        ctx.textAlign="left";


        ctx.fillText(
            title,
            x+20,
            y+25
        );



        ctx.fillStyle=color;


        ctx.font=
            "bold 28px DejaVuSans";


        ctx.fillText(
            value+" MS",
            x+20,
            y+55
        );


    }



    // ===============================
    // PING BOXES
    // ===============================


    box(
        70,
        145,
        "BOT PING",
        botPing,
        "#ff9d00"
    );


    box(
        340,
        145,
        "MESAJ PING",
        messagePing,
        "#5865ff"
    );


    box(
        610,
        145,
        "API PING",
        apiPing,
        "#00e676"
    );




    // ===============================
    // FOOTER
    // ===============================


    ctx.fillStyle="#777d95";

    ctx.font=
        "16px DejaVuSans";


    ctx.textAlign="right";


    ctx.fillText(
        "Naraku Network Monitor",
        820,
        220
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
