let n = 24; // nbr of squares
const container = document.querySelector(".container");
const size = document.getElementById("size");
const sizeLabel = document.getElementById("size-label");
let mouseDown = false;
const info = document.querySelector(".info");
const closeBtn = document.querySelector(".close-info");
const colorEl = document.getElementById("color");
const instructions = document.querySelector(".instructions");
let currentColor = colorEl.value;
let timerID;
let squares;

/**
 * this array contains five buttons
 * buttons[0] Color
 * buttons[1] Random
 * buttons[2] Rainbow
 * buttons[3] Stop Rainbow
 * buttons[4] Clear
 * buttons[5] Reset
 */
const buttons = document.querySelectorAll(".btn");

info.addEventListener("click", ()=> {
    instructions.style.animation = `quick-animation 1s linear`;
    instructions.style.display = "block";
    instructions.style.opacity = "1";
});

closeBtn.addEventListener("click", ()=> {
    instructions.style.opacity = "0";
    instructions.style.display = "none";
});

window.addEventListener("mousedown", () => {
    mouseDown = true;
});

window.addEventListener("mouseup", () => {
    mouseDown = false;
});

colorEl.addEventListener("input", (e)=> {
    currentColor = e.target.value;
});

// toggle active button
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove "active" class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    // Add "active" class to the clicked button
    button.classList.add('active');
  });
});


createSquares(n); // creating grid

buttons[2].addEventListener("click", rain); // initiates rain
buttons[3].addEventListener("click", stopRain); // stops rain
buttons[5].addEventListener("click", ()=> createSquares(n)); // resets the grid

// sets the size label on input
size.addEventListener("input", (e)=> {
    n = e.target.value;
    sizeLabel.textContent = `${n} x ${n}`;
    createSquares(n);
});

/**
 * @returns a random color in rgba form
 */
function randomColor() {
    let red = getRand(256);
    let green = getRand(256);
    let blue = getRand(256);
    let alpha = Math.random().toFixed(2);
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

/**
 * @param {number} n 
 * @returns an integer between 0 and n
 */
function getRand(n) {
    return Math.floor(Math.random() * n);
}

/**
 * creates a val x val div elements with class square
 * then set the innerHTML of the container to the new 
 * element with the divs.
 * adjusts the grid template.
 * reassigns the squares variable
 * calls squareEvent() to reassign events
 * @param {number} val number of squares per row or col
 */
function createSquares(val) {
    let el = "";
    for(let i = 0; i < val; i++){
        for(let j = 0; j < val; j++){
            el += `<div class="square"></div>`;
        }
    }
    container.innerHTML = el;
    container.style.gridTemplate = `repeat(${n}, auto) / repeat(${n}, auto)`;
    squares = document.querySelectorAll(".square");
    squareEvent();
}

/**
 * takes an element espcially a grid cell
 * parses for the selected button from the menu
 * then takes the appropriate actions which can be
 * setting color, random, clear
 * @param {HTMLElement} square 
 */
function parsingButtons(square) {
    if(buttons[0].classList.contains("active")){
        square.style.backgroundColor = currentColor;
    } 
    else if(buttons[1].classList.contains("active")){
        square.style.backgroundColor = randomColor();
    }
    else if(buttons[4].classList.contains("active")){
        square.style.backgroundColor = "transparent";
    }
}

/**
 * assigns event {mouseover, click} to each grid cell
 */
function squareEvent(){
    squares.forEach((square, index) => {
        square.addEventListener("mouseover", ()=> {
            if(mouseDown){
                parsingButtons(square);
            }
        })
        square.addEventListener("click", ()=> {
            parsingButtons(square);
        })
    });
}

// fill random cells with random colors
function rain(){
    let rand;
    timerID = setInterval(()=> {
        rand = getRand(n * n);
        squares[rand].style.backgroundColor = randomColor();
    }, 250)
}

// stop rain by killing the timerID
function stopRain(){
    clearInterval(timerID);
}