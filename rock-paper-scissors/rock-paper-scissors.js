let score =JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElements();



function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
  localStorage.removeItem('score');
  updateScoreElements();
}


document.querySelector('.js-reset-score-button').addEventListener('click', () => {
  resetScore();
})





// auto play button

let isAutoplaying = false;
let intervalId;

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
autoPlay();
})

function autoPlay(){
  if(!isAutoplaying){
   intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);

    isAutoplaying = true;
  }
  
  else {
    clearInterval(intervalId);
    isAutoplaying = false;

    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
  }
}

// putting keydown

 document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  } else if (event.key === 'p'){
    playGame('paper');
  } else if( event.key === 's'){
    playGame('scissors');
  } else if(event.key === 'a'){
    autoPlay();
  } else if(event.key === 'Backspace'){
    showResetConfirmation();
  }
   

 });

localStorage.removeItem('score');


// confirmation  if reset the score..............................

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    showResetConfirmation();
});

function showResetConfirmation(){
  document.querySelector('.js-reset-confirmation').innerHTML = `
  Are you sure you wa to reset the score?
  <button class="js-reset-confirm-yes reset-confirmation-button">
  Yes</button>

  <button class="js-reset-confirm-no reset-confirmation-button">
  No</button>
  `;

  document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });

  document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
    hideResetConfirmation();
  });
}

function hideResetConfirmation(){
  document.querySelector('.js-reset-confirmation').innerHTML = '';
}




/** Computer/player Move -------------------- */

function playGame(playerMove){
  const computerMove = pickComputerMove();

  let result = '';

    if (playerMove === 'scissors') { 
            if (computerMove === 'rock') {result = 'You Lose.';
            } else if (computerMove === 'paper') 
            {result = 'You Win.';  
            } else if (computerMove === 'scissors') 
            { result = 'Tie.';}}

      else if (playerMove === 'paper') { 
            if (computerMove === 'rock') {result = 'You Win.';
            } else if (computerMove === 'paper') 
            {result = 'Tie.';  
            } else if (computerMove === 'scissors') 
            { result = 'You Lose.';}}
          
      else if (playerMove === 'rock') {
            if (computerMove === 'rock') {result = 'tie.';
            } else if (computerMove === 'paper') 
            {result = 'You Lose.';  
            } else if (computerMove === 'scissors') 
            { result = 'You Win.';}

      }

      if (result === 'You Win.'){
        score.wins += 1;
      } else if (result === 'You Lose.'){
        score.losses += 1;
      } else if (result === 'Tie.'){
        score.ties += 1;
      }

  localStorage.setItem('score', JSON.stringify(score));

    updateScoreElements();



  /*result of each turns -----------------------------------*/


  const moveElement = document.querySelector('.js-moves');moveElement.innerHTML = 
        `You
          <img src="emoji/${playerMove}-emoji.png" 
          class="move-icon"> 
          <img src="emoji/${computerMove}-emoji.png" 
          class="move-icon">
      Computer`;

        document.querySelector('.js-result').innerHTML = result;

}

function updateScoreElements(){
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins} Loses: ${score.losses} Ties: ${score.ties}`;
}



/*random numbers section -----------------------------*/


function pickComputerMove () { 
    const randomNumber = Math.random();

    let computerMove = ''; 

            if(randomNumber >= 0 && randomNumber < (1 /3) ) {
              computerMove = 'rock';  
            }
            else if ( randomNumber >= (1 / 3) && randomNumber < (2 / 3)) {
              computerMove = 'paper';
            }
            else if (randomNumber >= (2 / 3) && randomNumber < 1){
              computerMove = 'scissors';
            }

 return computerMove;
}


