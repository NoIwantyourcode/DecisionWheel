const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('addBtn')

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple' ]
const textColors = ['white', 'white', 'black', 'white', 'white', 'white']
const options = ['Option A', 'Option B', 'Option C', 'Option D'];
const sliceAngle = (2 * Math.PI)/options.length;

let rotation = 0;
let velocity = 0;

function drawWheel(rotation) {
    ctx.clearRect(0, 0, 340, 340);
    options.forEach((option, i) => {
        const start = rotation + i * sliceAngle;
        const end = start + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(170, 170);
        ctx.arc(170, 170, 150, start, end);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        ctx.save()
        ctx.translate(170, 170);
        ctx.rotate(start + sliceAngle/2);
        ctx.fillStyle = textColors[i % textColors.length];
        ctx.font = '16px sans-serif';
        ctx.fillText(option, 75, 5);
        ctx.restore();
        ctx.textAlign = 'center';
    })
};

drawWheel(0)

function animate() {
    velocity *= 0.98;
    rotation += velocity;
    drawWheel(rotation);

    if (velocity > 0.0001) {
        requestAnimationFrame(animate);
    }
}

canvas.addEventListener('click', () => {
    velocity = 0.3;
    animate();
});