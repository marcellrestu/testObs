const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const segments = ["Win", "Try Again", "Bonus", "Jackpot", "Free Spin", "Lose"];
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#E74C3C"];
let startAngle = 0;
const arc = (2 * Math.PI) / segments.length;

function drawWheel() {
    for (let i = 0; i < segments.length; i++) {
        const angle = startAngle + i * arc;
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, angle, angle + arc);
        ctx.lineTo(200, 200);
        ctx.fill();

        ctx.fillStyle = "#FFF";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(segments[i], 200 + Math.cos(angle + arc / 2) * 140, 200 + Math.sin(angle + arc / 2) * 140);
    }
}

function spinWheel() {
    let spinAngle = Math.random() * 360 + 1800; 
    let finalAngle = (spinAngle % 360) / (360 / segments.length);
    let resultIndex = Math.floor(segments.length - finalAngle) % segments.length;

    startAngle += spinAngle * (Math.PI / 180);
    drawWheel();

    setTimeout(() => {
        document.getElementById("result").innerText = "Result: " + segments[resultIndex];
    }, 2000);
}

drawWheel();
