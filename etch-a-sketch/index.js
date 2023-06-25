let n = 20; // nbr of squares
const container = document.getElementsByClassName("container");

let mouseDown = false;

window.addEventListener("mousedown", () => {
    mouseDown = true;
});

window.addEventListener("mouseup", () => {
    mouseDown = false;
});

/**
 * @returns a random color in rgba form
 */
function randomColor() {
    let red = getRand();
    let green = getRand();
    let blue = getRand();
    let alpha = Math.random().toFixed(2);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/**
 * @returns an integer between 0 and 255
 */
function getRand() {
    return Math.floor(Math.random() * 256);
}

//console.log(randomColor())