const https = require("https");
const http = require("http");


// ======================================================
// NARAKU PING SYSTEM
// !ping
// !p
// ======================================================


const PING_CARD_URL =
    "https://naraku-card-api.vercel.app/api/ping";



const PNG_HEADER =
    Buffer.from([
        0x89,
        0x50,
        0x4E,
        0x47,
        0x0D,
        0x0A,
        0x1A,
        0x0A
    ]);



// ======================================================
// PNG FETCH
// ======================================================

function fetchPingCard(url){


    return new Promise((resolve,reject)=>{


        const parsed =
            new URL(url);



        const client =
            parsed.protocol === "https:"
            ? https
            : http;



        const request =
            client.get(
                url,
                {
                    headers:{
                        "User-Agent":
                        "NarakuBot/1.0",

                        "Accept":
                        "image/png"
                    }
                },

                response=>{


                    if(
                        response.statusCode !== 200
                    ){

                        reject(
                            new Error(
                                "HTTP "
                                +
                                response.statusCode
                            )
                        );

                        return;
                    }



                    const chunks=[];



                    response.on(
                        "data",
                        chunk=>{
                            chunks.push(chunk);
                        }
                    );



                    response.on(
                        "end",
                        ()=>{


                            const buffer =
                                Buffer.concat(chunks);



                            const isPNG =
                                buffer.length >= 8 &&
                                buffer
                                .subarray(0,8)
                                .equals(
                                    PNG_HEADER
                                );



                            if(!isPNG){

                                reject(
                                    new Error(
                                        "PNG değil"
                                    )
                                );

                                return;
                            }



                            resolve(buffer);


                        }
                    );



                }
            );



        request.on(
            "error",
            reject
        );


    });


}





// ======================================================
// URL
// ======================================================

function createPingURL(
    botPing,
    messagePing,
    apiPing
){


    const params =
        new URLSearchParams();



    params.set(
        "botPing",
        botPing
    );


    params.set(
        "messagePing",
        messagePing
    );


    params.set(
        "apiPing",
        apiPing
    );



    return (
        PING_CARD_URL
        +
        "?"
        +
        params.toString()
    );


}





// ======================================================
// API PING
// ======================================================

async function getApiPing(){


    const start =
        Date.now();



    try{

        await fetch(
            "https://discord.com/api/v10/gateway"
        );


    }catch{}



    return (
        Date.now()
        -
        start
    );


}





// ======================================================
// BOT PING
// ======================================================

function getBotPing(bot){


    try{


        if(
            bot?.ws?.ping >= 0
        ){

            return Math.round(
                bot.ws.ping
            );

        }


    }catch{}



    return 0;

}





// ======================================================
// SEND PING
// ======================================================

async function sendPing(
    message,
    messagePing
){


    try{


        const values = {


            botPing:
            getBotPing(
                global.narakuBot
            ),



            messagePing:
            Number(
                messagePing
            )
            ||
            0,



            apiPing:
            await getApiPing()


        };



        const url =
            createPingURL(

                values.botPing,

                values.messagePing,

                values.apiPing

            );



        console.log(
            "[PING CARD]",
            url
        );



        const image =
            await fetchPingCard(
                url
            );



        await message.reply({

            files:[

                {
                    attachment:image,

                    name:
                    "naraku-ping.png"
                }

            ],


            allowedMentions:{

                repliedUser:false

            }

        });



    }catch(err){


        console.error(
            "PING ERROR:",
            err
        );



        await message.reply({

            content:
            "❌ Ping kartı oluşturulamadı.",


            allowedMentions:{

                repliedUser:false

            }

        });


    }


}





// ======================================================
// REGISTER
// ======================================================

module.exports =
function registerPing(bot){



    if(!bot){

        throw new Error(
            "Ping sistemi bot yok."
        );

    }



    global.narakuBot =
        bot;



    global.narakuPing =
        sendPing;




    bot.command({

        name:"ping",


        aliases:[
            "p"
        ],



        code:`

$djsEval[
(async()=>{

await global.narakuPing(

msg,

$messagePing

);


})()
;false]

`

    });



    console.log(
        "✔ Ping sistemi aktif"
    );


};
