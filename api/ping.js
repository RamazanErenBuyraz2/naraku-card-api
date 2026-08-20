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


    ctx.fillStyle="#ffffff";

    ctx.font=
        "bold 34px Arial";


    ctx.textAlign="left";


    ctx.fillText(
        "Ping Durumu",
        70,
        70
    );



    ctx.fillStyle="#8b93ad";

    ctx.font=
        "18px Arial";


    ctx.fillText(
        "Discord bağlantı gecikmeleri",
        70,
        105
    );




    // =========================
    // ONLINE
    // =========================


    ctx.fillStyle="#00e676";

    ctx.beginPath();

    ctx.arc(
        780,
        70,
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
        755,
        70
    );





    // =========================
    // BAR FUNCTION
    // =========================


    function latencyBar(
        y,
        title,
        value
    ){


        let color;


        if(value <= 100){

            color="#00e676";

        }
        else if(value <= 250){

            color="#ffb300";

        }
        else{

            color="#ff3b30";

        }



        // TITLE

        ctx.textAlign="left";


        ctx.fillStyle="#ffffff";

        ctx.font=
            "bold 15px Arial";


        ctx.fillText(
            title,
            70,
            y
        );



        // MS


        ctx.textAlign="right";


        ctx.fillStyle=color;

        ctx.font=
            "bold 16px Arial";


        ctx.fillText(
            value+" MS",
            820,
            y
        );



        // BAR BACK


        ctx.fillStyle="#1c2130";


        ctx.beginPath();

        ctx.roundRect(
            70,
            y+18,
            750,
            12,
            8
        );

        ctx.fill();




        // BAR VALUE


        let width =
            Math.min(
                750,
                Math.max(
                    20,
                    value*2.5
                )
            );



        ctx.fillStyle=color;


        ctx.beginPath();

        ctx.roundRect(
            70,
            y+18,
            width,
            12,
            8
        );

        ctx.fill();



    }




    latencyBar(
        140,
        "Bot Gecikmesi",
        bot
    );


    latencyBar(
        180,
        "Mesaj Gecikmesi",
        msg
    );


    latencyBar(
        220,
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
