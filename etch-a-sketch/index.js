let n = 24; // nbr of squares
const container = document.querySelector(".container");
const size = document.getElementById("size");
const sizeLabel = document.getElementById("size-label");
let mouseDown = false;
const colorEl = document.getElementById("color");
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

window.addEventListener("mousedown", () => {
    mouseDown = true;
});

window.addEventListener("mouseup", () => {
    mouseDown = false;
});

colorEl.addEventListener("input", (e)=> {
    currentColor = e.target.value;
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove "active" class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add "active" class to the clicked button
    button.classList.add('active');
  });
});


createSquares(n); // creating grid

buttons[2].addEventListener("click", rain);
buttons[3].addEventListener("click", stopRain);
buttons[5].addEventListener("click", ()=> createSquares(n)); // resetting the grid

// setting the size label on input
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
 * setting color, reset, clear, start or stop rainbow
 * @param {HTMLElement} square 
 */
function parsingButtons(square) {
    if(buttons[0].classList.contains("active")){
        square.style.backgroundColor = currentColor;
    } 
    else if(buttons[1].classList.contains("active")){
        square.style.backgroundColor = randomColor();
    }
    // else if(buttons[2].classList.contains("active")){
    //     rain();
    // }
    // else if(buttons[3].classList.contains("active")){
    //     clearInterval(timerID);
    // }
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

function rain(){
    let rand;
    timerID = setInterval(()=> {
        rand = getRand(n * n);
        squares[rand].style.backgroundColor = randomColor();
    }, 250)
}

function stopRain(){
    clearInterval(timerID);
}
