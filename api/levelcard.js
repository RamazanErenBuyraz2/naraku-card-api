const { createCanvas, loadImage, registerFont } = require("@napi-rs/canvas");
const path = require("path");

// 1. Font Dosyasını Canvas'a Tescil Etme
const fontPath = path.join(process.cwd(), "fonts", "DejaVuSans.ttf");
registerFont(fontPath, { family: "DejaVuSans" });

module.exports = async (req, res) => {
    // Canvas ve Context Kurulumu
    const canvas = createCanvas(900, 270);
    const ctx = canvas.getContext("2d");

    // Dynamic / Query Parametreleri
    const username = req.query.username || "erenbuyraz06";
    const level = req.query.level || "1";
    const rank = req.query.rank || "1";
    const xp = parseInt(req.query.xp || "762");
    const nextXP = parseInt(req.query.nextXP || "6000");
    const avatarUrl = req.query.avatar || "https://i.imgur.com/6VBx3io.png";

    // Progress Hesaplama
    const progress = Math.max(0, Math.min(1, xp / nextXP));

    // Arka Plan (Siyah Dış Alan)
    ctx.fillStyle = "#0c0d10";
    ctx.fillRect(0, 0, 900, 270);

    // Ana Kart (Koyu Gri Yuvarlatılmış Kutucuk)
    const cardX = 30, cardY = 25, cardW = 840, cardH = 220, cardR = 18;
    ctx.fillStyle = "#12141d";
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, cardR);
    ctx.fill();

    // Avatar Dış Mor Parlaması (Glow)
    const avatarX = 115, avatarY = 135, avatarR = 60;
    ctx.save();
    ctx.shadowColor = "#4d42ec";
    ctx.shadowBlur = 20;
    ctx.strokeStyle = "#5b51f5";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(avatarX, avatarY, avatarR + 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Avatar Görseli Çizimi ve Maskeleme
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
        // Avatar yüklenemezse varsayılan gri daire
        ctx.fillStyle = "#2a2e3d";
        ctx.beginPath();
        ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
        ctx.fill();
    }

    // ==========================================
    // METİNLER (DejaVuSans Fontu Kullanılarak)
    // ==========================================

    // Kullanıcı Adı
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px 'DejaVuSans'";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(username, 200, 80);

    // SIRA #X
    ctx.fillStyle = "#7c839b";
    ctx.font = "bold 18px 'DejaVuSans'";
    ctx.textAlign = "right";
    ctx.fillText(`SIRA #${rank}`, 805, 60);

    // SEVİYE X
    ctx.fillStyle = "#4e52e4";
    ctx.font = "bold 32px 'DejaVuSans'";
    ctx.textAlign = "right";
    ctx.fillText(`SEVİYE ${level}`, 805, 95);

    // ==========================================
    // XP BAR VE EJDERHA MASKOTU
    // ==========================================
    const barX = 200, barY = 145, barW = 605, barH = 34, barR = 4;

    // XP Bar Arka Planı
    ctx.fillStyle = "#0d1117";
    ctx.beginPath();
    ctx.roundRect(barX, barY, barW, barH, barR);
    ctx.fill();

    // XP Bar Çerçevesi
    ctx.strokeStyle = "#1b4a52";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // XP Bar Gradient Dolgusu
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

    // Ejderha Maskotu
    if (progress > 0) {
        const dragonX = barX + fillW - 4;
        const dragonY = barY + barH / 2;

        // Gövde
        ctx.fillStyle = "#ff1a00";
        ctx.beginPath();
        ctx.arc(dragonX, dragonY, 18, 0, Math.PI * 2);
        ctx.fill();

        // Kanat Detayı
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

    // XP Metni (DejaVuSans)
    const xpText = `${xp.toLocaleString("tr-TR")} / ${nextXP.toLocaleString("tr-TR")} XP`;
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px 'DejaVuSans'";
    ctx.textAlign = "right";
    ctx.fillText(xpText, 805, 205);

    // Yanıtı Çıktı Olarak Gönderme
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.send(await canvas.toBuffer("image/png"));
};
