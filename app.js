const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('addBtn')
const saved = localStorage.getItem('options')

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple' ]
const textColors = ['white', 'white', 'black', 'white', 'white', 'white']
const options = saved ? JSON.parse(saved) : ['Option A', 'Option B', 'Option C', 'Option D']
const sliceAngle = (2 * Math.PI)/options.length;

let history = []
let rotation = 0;
let velocity = 0;

function drawWheel(rotation) {
    ctx.clearRect(0, 0, 340, 340);
    const sliceAngle = (2 * Math.PI)/options.length;
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
renderList()

function animate() {
    velocity *= 0.98;
    rotation += velocity;
    drawWheel(rotation);

    if (velocity > 0.001) {
        requestAnimationFrame(animate);
    } else {
        showResult();
    }
}

canvas.addEventListener('click', () => {
    velocity = 0.3;
    animate();
});

btn.addEventListener('click', () => {
    const value = document.getElementById('optionInput').value; console.log('please do not enter duplicate or empty options.')
    if (value.trim() === '') return;
    if (options.includes(value)) return; document.getElementById('optionInput').value = ''; console.log("Please do not enter duplicate or empty options.");
    options.push(value);
    drawWheel(0)
    renderList()
    saveOptions();
})

function renderList() {
    const list = document.getElementById('optionsList');
    list.innerHTML = '';

    options.forEach((option, i) => {
        const item = document.createElement('li');
        item.textContent = option;
        list.appendChild(item);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remove';
        deleteBtn.addEventListener('click', () => {
            options.splice(i, 1);
            drawWheel(rotation);
            renderList();
        });

        item.appendChild(deleteBtn);
    });
}

function showResult() {
    const sliceAngle = (2 * Math.PI)/options.length;
    const normalized = (2 * Math.PI) - (rotation % (2 * Math.PI));
    const index = Math.floor(normalized/sliceAngle) % options.length;
    document.getElementById('result').textContent = 'Winner: '+ options[index];
    history.unshift(options[index]);
    if (history.length > 5) history.pop();
    renderHistory();
    const popup = document.getElementById('winnerPopup');
    document.getElementById('winnerText').textContent = 'Winner: ' + option[index]
}

document.querySelectorAll(".themeBtn").forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.setAttribute('data-theme', btn.getAttribute('data-theme'));
    });
});

function saveOptions() {
    localStorage.setItem('options', JSON.stringify(options));
}

function renderHistory() {
    const list = document.getElementById('history');
    list.innerHTML = '';

    history.forEach(winner => {
        const item = document.createElement('li');
        item.textContent = winner;
        list.appendChild(item);
    });
}
