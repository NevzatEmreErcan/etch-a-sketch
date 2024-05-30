const penColor_input = document.querySelector("#pen-color");
const gridValue_input = document.querySelector("#grid-value");
const gridSizeText_p = document.querySelector(".grid-size")
const erase_btn = document.querySelector("#erase-btn");
const clear_btn = document.querySelector("#clear-btn");
const canvas_div = document.querySelector(".canvas");
let isMouseDown = false;
let eraseMode = false

function cellCreater(value = 16) {
    while (canvas_div.firstChild) {
        canvas_div.removeChild(canvas_div.firstChild);
    }

    const cellSize = 640/value;

    for (let i = 1; i <= value*value; i++) {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell")
        cellDiv.style.width = `${cellSize}px`
        cellDiv.style.height = `${cellSize}px`
        canvas_div.appendChild(cellDiv)
    }
}

window.onload = function () {
    cellCreater();
};

gridValue_input.oninput = () => {
    gridSizeText_p.innerHTML = `${gridValue_input.value}x${gridValue_input.value}`

    cellCreater(gridValue_input.value)
}

erase_btn.addEventListener("click", () => {
    eraseMode = !eraseMode;
    if (eraseMode) {
        erase_btn.classList.add("toggle-btn")
    } else {
        erase_btn.classList.remove("toggle-btn")

    }
})

canvas_div.addEventListener("mousedown", () => {
    isMouseDown = true;
})

canvas_div.addEventListener("mouseup", () => {
    isMouseDown = false;
})


canvas_div.addEventListener("mouseover", (e) => {
    if (isMouseDown && e.target.classList.contains("cell")) {
        painter(e.target);
    }
})

canvas_div.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
        painter(e.target);
    }
})

function painter(target) {
    if (eraseMode){
        target.style.backgroundColor = "#ffffff"
        target.style.borderColor = "#00000034"
    } else {
        target.style.backgroundColor = penColor_input.value
        target.style.borderColor = penColor_input.value

        clear_btn.addEventListener("click", () => {
            target.style.backgroundColor = "#ffffff"
            target.style.borderColor = "#00000034"
        })
    }

}