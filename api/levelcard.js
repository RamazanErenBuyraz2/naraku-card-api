const { createCanvas, loadImage } = require("@napi-rs/canvas");

module.exports = async (req, res) => {
    // 1. Canvas ve Context Kurulumu
    const canvas = createCanvas(900, 270);
    const ctx = canvas.getContext("2d");

    // Parametreler
    const username = req.query.username || "erenbuyraz06";
    const level = req.query.level || "1";
    const rank = req.query.rank || "1";
    const xp = parseInt(req.query.xp || "762");
    const nextXP = parseInt(req.query.nextXP || "6000");
    const avatarUrl = req.query.avatar || "https://i.imgur.com/6VBx3io.png"; // Varsayılan veya gelen avatar

    // XP Oranı Hesaplama
    const progress = Math.max(0, Math.min(1, xp / nextXP));

    // 2. Dış Arka Plan (Siyah)
    ctx.fillStyle = "#0c0d10";
    ctx.fillRect(0, 0, 900, 270);

    // 3. İç Yuvarlatılmış Kart (Dark Card)
    const cardX = 30, cardY = 25, cardW = 840, cardH = 220, cardR = 18;
    ctx.fillStyle = "#12141d";
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, cardR);
    ctx.fill();

    // 4. Avatar Alanı (Dairesel Maske + Glow + Halka)
    const avatarX = 115, avatarY = 135, avatarR = 60;

    // Dış Mor Parlama (Glow)
    ctx.save();
    ctx.shadowColor = "#4d42ec";
    ctx.shadowBlur = 20;
    ctx.strokeStyle = "#5b51f5";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarR + 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Avatar Görseli ve Dairesel Maskeleme
    try {
        const img = await loadImage(avatarUrl);
        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, avatarX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
        ctx.restore();
    } catch (e) {
        // Avatar yüklenemezse gri daire çiz
        ctx.fillStyle = "#2a2e3d";
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
        ctx.fill();
    }

    // 5. Metinler

    // Kullanıcı Adı
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(username, 200, 80);

    // SIRA #X
    ctx.fillStyle = "#7c839b";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`SIRA #${rank}`, 805, 60);

    // SEVİYE X
    ctx.fillStyle = "#4e52e4";
    ctx.font = "bold 32px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`SEVİYE ${level}`, 805, 95);

    // 6. XP Barı Kurulumu
    const barX = 200, barY = 145, barW = 605, barH = 34, barR = 4;

    // XP Arka Planı
    ctx.fillStyle = "#0d1117";
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, barR);
    ctx.fill();

    // XP Çerçevesi (Border)
    ctx.strokeStyle = "#1b4a52";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // XP Dolgusu (Gradient)
    const fillW = Math.max(12, barW * progress);
    const grad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
    grad.addColorStop(0, "#ff3b00");
    grad.addColorStop(0.5, "#ff8800");
    grad.addColorStop(1, "#ffcc00");

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(barX, barY, fillW, barH, barR);
    ctx.clip();
    ctx.fillStyle = grad;
    ctx.fillRect(barX, barY, fillW, barH);
    ctx.restore();

    // 7. Ejderha / Maskot Simgesi (XP Bar Ucu)
    if (progress > 0) {
        const dragonX = barX + fillW - 4;
        const dragonY = barY + barH / 2;

        // Ejderha Gövdesi (Kırmızı Daire)
        ctx.fillStyle = "#ff1a00";
        ctx.beginPath();
        ctx.arc(dragonX, dragonY, 18, 0, Math.PI * 2);
        ctx.fill();

        // Ejderha Kanadı / Alev Detayı
        ctx.fillStyle = "#ffae00";
        ctx.beginPath();
        ctx.moveTo(dragonX - 6, dragonY - 2);
        ctx.lineTo(dragonX - 22, dragonY - 14);
        ctx.lineTo(dragonX - 10, dragonY + 5);
        ctx.closePath();
        ctx.fill();

        // Göz
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(dragonX + 7, dragonY - 4, 2.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // 8. XP Metni (Sağ Alt)
    const xpText = `${xp.toLocaleString("tr-TR")} / ${nextXP.toLocaleString("tr-TR")} XP`;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(xpText, 805, 205);

    // 9. Görsel Çıktısı
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(await canvas.toBuffer("image/png"));
};
