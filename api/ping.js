const { createCanvas, registerFont } = require("@napi-rs/canvas");
const path = require("path");


// ======================================================
// FONT
// ======================================================

const fontPath =
    path.join(
        process.cwd(),
        "fonts",
        "DejaVuSans.ttf"
    );


try {

    registerFont(
        fontPath,
        {
            family:"DejaVuSans"
        }
    );

}catch{}



// ======================================================
// ROUND RECT
// ======================================================

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



// ======================================================
// BAR
// ======================================================

function drawBar(
    ctx,
    x,
    y,
    width,
    value
){

    const max = 500;


    roundRect(
        ctx,
        x,
        y,
        width,
        18,
        10,
        "#202531"
    );



    const progress =
        Math.min(
            value / max,
            1
        );



    const fill =
        Math.max(
            15,
            width * progress
        );



    const gradient =
        ctx.createLinearGradient(
            x,
            0,
            x + width,
            0
        );


    gradient.addColorStop(
        0,
        "#00ff88"
    );


    gradient.addColorStop(
        0.5,
        "#00c6ff"
    );


    gradient.addColorStop(
        1,
        "#7b5cff"
    );



    ctx.fillStyle =
        gradient;



    ctx.beginPath();

    ctx.roundRect(
        x,
        y,
        fill,
        18,
        10
    );

    ctx.fill();


}



// ======================================================
// API
// ======================================================


module.exports = async(req,res)=>{


    const bot =
        Number(
            req.query.botPing || 0
        );


    const msg =
        Number(
            req.query.messagePing || 0
        );


    const api =
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

    ctx.fillStyle =
        "#08090d";

    ctx.fillRect(
        0,
        0,
        900,
        280
    );




    // OUTER CARD

    roundRect(
        ctx,
        25,
        25,
        850,
        230,
        25,
        "#252938"
    );



    // INNER CARD

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

    ctx.fillStyle =
        "#ffffff";


    ctx.font =
        "bold 34px DejaVuSans";


    ctx.fillText(
        "Naraku Ping",
        70,
        85
    );



    ctx.fillStyle =
        "#7c839b";


    ctx.font =
        "20px DejaVuSans";


    ctx.fillText(
        "Discord bağlantı durumu",
        70,
        115
    );





    // VALUES


    const items = [

        {
            name:"BOT PING",
            value:bot,
            y:155
        },

        {
            name:"MESSAGE PING",
            value:msg,
            y:195
        },

        {
            name:"API PING",
            value:api,
            y:235
        }

    ];



    items.forEach(item=>{


        ctx.fillStyle =
            "#ffffff";


        ctx.font =
            "bold 18px DejaVuSans";


        ctx.fillText(
            item.name,
            70,
            item.y
        );



        ctx.fillStyle =
            "#ff9d00";


        ctx.textAlign =
            "right";


        ctx.fillText(
            item.value+" MS",
            805,
            item.y
        );


        ctx.textAlign =
            "left";



        drawBar(
            ctx,
            250,
            item.y-15,
            520,
            item.value
        );



    });





    // FOOTER


    ctx.fillStyle =
        "#7c839b";


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


    res.setHeader(
        "Cache-Control",
        "no-cache"
    );



    res.send(
        canvas.toBuffer("image/png")
    );


};
