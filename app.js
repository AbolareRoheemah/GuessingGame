/* GAME FUNCTION:
- Player must guess a number between a max and a min set value
- Player gets a certain amount of guesses 
- Notify player of guesses remianing 
- Notify palyer of correct ans if loose 
- Let player rchoose to play again */

// game values
let min = 1,
    max = 10,
    winingNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


// Assign UI min max
minNum.textContent = min;
maxNum.textContent = max;

//Play agin event listener
game.addEventListener('mousedown', function(e){
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    //Validate
    if (isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if (guess === winingNum) {
        //Game Over - won
        gameOver(true, `${winingNum} is correct, YOU WIN!!!`);
    } else {
        //Game continues - answer wrong

        //subtract from guesses left
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //Game over - lost
            
            gameOver(false,`Game over!!! You lost. The correct number was ${winingNum}`)

        } else {
            //Game continues - answer wrong
            setMessage(`${guess} is not corect, ${guessesLeft} guesses left`)

            //change border color
            guessInput.style.borderColor = 'red';

            //set text color
            message.style.color = 'red'

            //Clear input
            guessInput.value = '';
        }
    }
});

//Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable input
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    //Set text color
    message.style.color = color;
    //Set message
    setMessage(msg); 

    //Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'
}

//Get winning Number
function getRandomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set message
function setMessage(msg, color){
    message.textContent = msg;
    message.style.color = color;
}