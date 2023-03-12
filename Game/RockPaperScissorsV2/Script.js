const title = document.querySelector("title").textContent;
let username = document.querySelector(".username");
let message = document.querySelector(".message");
let winner = document.querySelector(".winner");

const guesses = ["Rock", "Paper", "Scissors"];
let userguess;
let computer_guess;

let userscore = document.querySelector(".userscore");
let computer_score = document.querySelector(".computer_score");

const item = Array.from(document.querySelectorAll(".game_item"));
item.forEach((button) => button.addEventListener("click", play));


alert(`Welcome to ${title}`)

let input = prompt("Please enter your name: ")

if (input === "" || input === null)
    username.textContent = "User";
else
    username.textContent = input;


/*
compare user and computer guess 
@param 1: string user guess 
@param 2: int computer guess
@return: int -1, 0, or 1 
            0 is a tie
            1 computer wins
*/
function compareGuesses(user, compu){
    if(compu === 0 && user === "Scissors" || compu === 1 && user === "Rock" ||
        compu === 2 && user === "Paper") return 1;
    else if(user === "Rock" && compu === 2 || user === "Paper" && compu === 0 ||
        user === "Scissors" && compu === 1) return -1;
    else return 0;
}

/*
function that handle click event
trigered by game_item 
get the guesses
calls to function show to set the guesses in the page
calls compareGuesses to get result
display winner
*/
function play(e){
    userguess = e.target.textContent;
    computer_guess = Math.floor(Math.random() * 3);
    let result = compareGuesses(userguess, computer_guess);
    showGuess(".userguess", userguess);
    showGuess(".computer_guess", guesses[computer_guess]);
    
    if ( result === 1) {
        computer_score.textContent = Number(computer_score.textContent) + 1;
        winner.textContent = "Computer wins.";
    }
    else if(result === -1){
        userscore.textContent = Number(userscore.textContent) + 1;
        winner.textContent = `${username.textContent} wins.`;
    }
    else
        winner.textContent = "It's a tie.";
    
    message.style.visibility = "visible";
}

/*
display the guess of each user
@param container: string selector that specifies where to display
@param text: string to be displayed
*/
function showGuess(container, text){
    let place = document.querySelector(container);
    place.textContent = text;
}   

