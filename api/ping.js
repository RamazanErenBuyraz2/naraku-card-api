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
    // CARD
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





    ctx.textBaseline="middle";




    // =========================
    // HEADER
    // =========================


    ctx.textAlign="left";


    ctx.fillStyle="#ffffff";

    ctx.font=
        "bold 32px Arial";


    ctx.fillText(
        "Ping Durumu",
        70,
        70
    );



    ctx.fillStyle="#8b93ad";

    ctx.font=
        "17px Arial";


    ctx.fillText(
        "Discord servis gecikmeleri",
        70,
        105
    );






    // =========================
    // STATUS
    // =========================


    ctx.fillStyle="#00e676";

    ctx.beginPath();

    ctx.arc(
        790,
        70,
        8,
        0,
        Math.PI*2
    );

    ctx.fill();



    ctx.textAlign="right";

    ctx.fillStyle="#00e676";

    ctx.font=
        "bold 16px Arial";


    ctx.fillText(
        "ONLINE",
        770,
        70
    );






    // =========================
    // PING COLOR
    // =========================


    function getColor(ms){

        if(ms <= 100)
            return "#00e676";


        if(ms <= 250)
            return "#ffb300";


        return "#ff3d3d";

    }







    // =========================
    // STATUS ROW
    // =========================


    function statusLine(
        y,
        title,
        value
    ){


        const color =
            getColor(value);



        // TITLE

        ctx.textAlign="left";

        ctx.fillStyle="#8f96ad";

        ctx.font=
            "bold 14px Arial";


        ctx.fillText(
            title,
            75,
            y
        );





        // MS

        ctx.textAlign="right";

        ctx.fillStyle=color;

        ctx.font=
            "bold 20px Arial";


        ctx.fillText(
            value+" MS",
            820,
            y
        );





        // BAR BACK

        ctx.fillStyle="#181c27";

        ctx.beginPath();

        ctx.roundRect(
            75,
            y+18,
            745,
            8,
            8
        );

        ctx.fill();





        // BAR VALUE

        let width =
            Math.min(
                745,
                Math.max(
                    40,
                    value * 2.5
                )
            );



        ctx.fillStyle=color;


        ctx.beginPath();

        ctx.roundRect(
            75,
            y+18,
            width,
            8,
            8
        );

        ctx.fill();



    }







    statusLine(
        135,
        "BOT Gecikmesi",
        bot
    );



    statusLine(
        175,
        "Mesaj Gecikmesi",
        msg
    );



    statusLine(
        215,
        "API Gecikmesi",
        api
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
        "no-store"
    );


    res.send(
        canvas.toBuffer("image/png")
    );


};
