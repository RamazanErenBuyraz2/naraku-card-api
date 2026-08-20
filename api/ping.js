const { 
    createCanvas,
    registerFont
} = require("@napi-rs/canvas");

const path = require("path");


// FONT

try {

    registerFont(
        path.join(
            process.cwd(),
            "fonts",
            "DejaVuSans.ttf"
        ),
        {
            family:"DejaVuSans"
        }
    );

} catch(e){

    console.log(
        "Font yüklenemedi",
        e
    );

}



function roundRect(
    ctx,
    x,
    y,
    w,
    h,
    r,
    color
){

    ctx.fillStyle=color;

    ctx.beginPath();

    ctx.roundRect(
        x,
        y,
        w,
        h,
        r
    );

    ctx.fill();

}




module.exports = async(req,res)=>{


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



    const canvas =
        createCanvas(
            900,
            280
        );


    const ctx =
        canvas.getContext("2d");



    // BACKGROUND

    ctx.fillStyle="#08090d";

    ctx.fillRect(
        0,
        0,
        900,
        280
    );



    // CARD

    roundRect(
        ctx,
        25,
        25,
        850,
        230,
        25,
        "#252938"
    );


    roundRect(
        ctx,
        35,
        35,
        830,
        210,
        20,
        "#11131a"
    );



    // TITLE

    ctx.fillStyle="#ffffff";

    ctx.font =
        "bold 36px DejaVuSans";


    ctx.textAlign="left";


    ctx.fillText(
        "Naraku Ping",
        70,
        85
    );



    ctx.fillStyle="#8d93a8";

    ctx.font =
        "20px DejaVuSans";


    ctx.fillText(
        "Network bağlantı sonuçları",
        70,
        115
    );



    const data=[

        {
            name:"BOT PING",
            value:botPing,
            y:155
        },

        {
            name:"MESAJ PING",
            value:messagePing,
            y:195
        },

        {
            name:"API PING",
            value:apiPing,
            y:235
        }

    ];



    for(
        const item of data
    ){


        ctx.fillStyle="#ffffff";

        ctx.font =
            "bold 18px DejaVuSans";


        ctx.fillText(
            item.name,
            70,
            item.y
        );



        ctx.fillStyle="#ff9d00";

        ctx.textAlign="right";


        ctx.font =
            "bold 20px DejaVuSans";


        ctx.fillText(
            item.value+" MS",
            805,
            item.y
        );



        ctx.textAlign="left";



        // BAR


        roundRect(
            ctx,
            250,
            item.y-17,
            400,
            12,
            8,
            "#252a35"
        );



        const percent =
            Math.min(
                item.value / 500,
                1
            );


        const width =
            Math.max(
                10,
                400 * percent
            );



        const gradient =
            ctx.createLinearGradient(
                250,
                0,
                650,
                0
            );


        gradient.addColorStop(
            0,
            "#ff7b00"
        );


        gradient.addColorStop(
            1,
            "#ffcc00"
        );



        roundRect(
            ctx,
            250,
            item.y-17,
            width,
            12,
            8,
            gradient
        );

    }




    ctx.fillStyle="#7c839b";

    ctx.font =
        "16px DejaVuSans";


    ctx.fillText(
        "Naraku Network Monitor",
        70,
        225
    );



    res.setHeader(
        "Content-Type",
        "image/png"
    );


    res.send(
        canvas.toBuffer("image/png")
    );

};
