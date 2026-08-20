const { createCanvas } = require("@napi-rs/canvas");

module.exports = (req,res)=>{

    const canvas = createCanvas(900,280);
    const ctx = canvas.getContext("2d");


    ctx.fillStyle = "#000000";
    ctx.fillRect(0,0,900,280);


    // TEST BOX

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(
        50,
        50,
        400,
        80
    );


    // TEXT

    ctx.fillStyle = "#ffffff";

    ctx.font = "50px sans-serif";

    ctx.textBaseline = "top";


    ctx.fillText(
        "NARAKU TEST",
        60,
        60
    );


    res.setHeader(
        "Content-Type",
        "image/png"
    );


    res.send(
        canvas.toBuffer("image/png")
    );

};
