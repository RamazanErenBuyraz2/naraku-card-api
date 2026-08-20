const {
    createCanvas
} = require("@napi-rs/canvas");


// ===============================
// API
// ===============================

module.exports = async (req, res) => {


    const canvas =
        createCanvas(
            900,
            270
        );


    const ctx =
        canvas.getContext("2d");



    const botPing =
        Number(req.query.botPing || 0);

    const messagePing =
        Number(req.query.messagePing || 0);

    const apiPing =
        Number(req.query.apiPing || 0);



    // ===============================
    // BACKGROUND
    // ===============================

    ctx.fillStyle = "#08090d";

    ctx.fillRect(
        0,
        0,
        900,
        270
    );



    // ===============================
    // CARD
    // ===============================

    ctx.fillStyle = "#12141d";

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
    // TEXT TEST
    // ===============================

    ctx.textBaseline = "middle";



    ctx.fillStyle = "#ffffff";

    ctx.font =
        "bold 40px Arial";

    ctx.textAlign = "left";


    ctx.fillText(
        "Naraku Ping",
        70,
        75
    );



    ctx.fillStyle="#7d8599";

    ctx.font =
        "20px Arial";


    ctx.fillText(
        "Discord bağlantı değerleri",
        70,
        110
    );





    // ===============================
    // BOX
    // ===============================


    function drawBox(
        x,
        title,
        value,
        color
    ){


        ctx.fillStyle="#1b1f2b";


        ctx.beginPath();


        ctx.roundRect(
            x,
            145,
            220,
            70,
            15
        );


        ctx.fill();



        ctx.fillStyle="#9aa0b5";

        ctx.font =
            "bold 15px Arial";


        ctx.textAlign="left";


        ctx.fillText(
            title,
            x+20,
            170
        );



        ctx.fillStyle=color;


        ctx.font =
            "bold 28px Arial";


        ctx.fillText(
            value + " MS",
            x+20,
            200
        );


    }




    drawBox(
        70,
        "BOT PING",
        botPing,
        "#ff9d00"
    );


    drawBox(
        340,
        "MESAJ PING",
        messagePing,
        "#5865ff"
    );


    drawBox(
        610,
        "API PING",
        apiPing,
        "#00e676"
    );





    // ===============================
    // FOOTER
    // ===============================


    ctx.fillStyle="#777";

    ctx.font =
        "16px Arial";


    ctx.textAlign="right";


    ctx.fillText(
        "Naraku Network Monitor",
        820,
        235
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
        "no-store, no-cache, must-revalidate"
    );


    res.send(
        canvas.toBuffer("image/png")
    );


};
