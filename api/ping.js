const {
    createCanvas
} = require("@napi-rs/canvas");


module.exports = async (req, res) => {


    const canvas = createCanvas(
        900,
        270
    );


    const ctx = canvas.getContext("2d");



    const botPing =
        Number(req.query.botPing || 0);

    const messagePing =
        Number(req.query.messagePing || 0);

    const apiPing =
        Number(req.query.apiPing || 0);



    // =========================
    // BACKGROUND
    // =========================


    ctx.fillStyle = "#080a10";

    ctx.fillRect(
        0,
        0,
        900,
        270
    );



    // =========================
    // MAIN CARD
    // =========================


    ctx.save();

    ctx.shadowColor = "#5865f2";
    ctx.shadowBlur = 25;


    ctx.fillStyle = "#11141d";

    ctx.beginPath();

    ctx.roundRect(
        35,
        25,
        830,
        220,
        22
    );

    ctx.fill();

    ctx.restore();




    ctx.textBaseline = "middle";



    // =========================
    // HEADER
    // =========================


    ctx.textAlign="left";


    ctx.fillStyle="#ffffff";

    ctx.font =
        "bold 34px Arial";


    ctx.fillText(
        "Ping",
        75,
        75
    );



    ctx.fillStyle="#8991aa";

    ctx.font =
        "18px Arial";


    ctx.fillText(
        "Bağlantı değerleri",
        75,
        110
    );




    // ONLINE BADGE


    ctx.fillStyle="#14251c";

    ctx.beginPath();

    ctx.roundRect(
        720,
        55,
        110,
        35,
        15
    );

    ctx.fill();



    ctx.fillStyle="#00e676";

    ctx.beginPath();

    ctx.arc(
        745,
        72,
        6,
        0,
        Math.PI*2
    );

    ctx.fill();



    ctx.fillStyle="#00e676";

    ctx.font =
        "bold 15px Arial";


    ctx.textAlign="center";


    ctx.fillText(
        "ONLINE",
        785,
        72
    );




    // =========================
    // BOX
    // =========================


    function createBox(
        x,
        title,
        value,
        color
    ){


        ctx.fillStyle="#191d29";


        ctx.beginPath();

        ctx.roundRect(
            x,
            150,
            220,
            65,
            15
        );

        ctx.fill();



        ctx.textAlign="left";


        ctx.fillStyle="#8b92a8";

        ctx.font =
            "bold 14px Arial";


        ctx.fillText(
            title,
            x+20,
            172
        );



        ctx.fillStyle=color;

        ctx.font =
            "bold 27px Arial";


        ctx.fillText(
            value+" MS",
            x+20,
            202
        );


    }



    createBox(
        75,
        "BOT",
        botPing,
        "#ff9d00"
    );


    createBox(
        340,
        "MESSAGE",
        messagePing,
        "#5865f2"
    );


    createBox(
        605,
        "API",
        apiPing,
        "#00e676"
    );




    // =========================
    // RESPONSE
    // =========================


    res.setHeader(
        "Content-Type",
        "image/png"
    );


    res.setHeader(
        "Cache-Control",
        "no-store, no-cache"
    );


    res.send(
        canvas.toBuffer("image/png")
    );


};
