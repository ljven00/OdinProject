
let user_guess;
let computer_guess;

const item = Array.from(document.querySelectorAll(".game_item"));
item.forEach((button) => button.addEventListener("click", play));

let user_name = document.querySelector(".user_name");
let user_score = document.querySelector(".user_score");
let computer_score = document.querySelector(".computer_score");
let message = document.querySelector(".message>p");

function play(e){
    user_guess = e.target.textContent;
    computer_guess = Math.ceil(Math.random() * 3);
    let result = compareGuesses(user_guess, computer_guess);
    if ( result === 1) {
        computer_score.textContent = Number(computer_score.textContent) + 1;
        message.textContent = "Computer Wins.";
    }
    else if(result === -1){
        user_score.textContent = Number(user_score.textContent) + 1;
        message.textContent = `${user_name.textContent} Wins.`;
    }
    else 
        message.textContent = "Tie.";
}

/*
compare the input value from user and computer
@param: user and computer guess
@return: 1 if computer wins 0 for tie and -1 if user wins
*/
function compareGuesses(user, compu){
    if(compu === 1 && user === "Scissors" || compu === 2 && user === "Rock" ||
        compu === 3 && user === "Paper") return 1;
    else if(user === "Rock" && compu === 3 || user === "Paper" && compu === 1 ||
        user === "Scissors" && compu === 2) return -1;
    else return 0;
}

alert("Welcome to the game rock paper scissors!");
user_name.textContent = prompt("Please enter your name:")
