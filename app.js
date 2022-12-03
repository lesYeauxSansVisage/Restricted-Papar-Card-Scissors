const cards = [
  {
    name: "scissor",
    img: "https://www.1999.co.jp/itbig14/10142728a.jpg",
  },
  {
    name: "paper",
    img: "https://www.1999.co.jp/itbig14/10142729a.jpg",
  },
  {
    name: "rock",
    img: "https://www.1999.co.jp/itbig13/10132801a.jpg",
  },
];

const playerCards = document.querySelector(".playerCards");
const computerCards = document.querySelector(".computerCards");
const turnButton = document.querySelector("#playCard");
const startButton = document.querySelector(".buttonStart");
const startScreen = document.querySelector(".startScreen");
const boardGame = document.querySelector(".boardGame");
const playAgainButton = document.querySelectorAll(".playAgain");
let checker = true;
let playerScore = document.querySelector("#playerScore");
let computerScore = document.querySelector("#computerScore");
let playerChoice = "";

playAgainButton.forEach((n) => {
  n.addEventListener("click", () => {
    n.parentElement.style.display = "none";
    playerScore.innerText = "0";
    computerScore.innerText = "0";
    computerCards.innerHTML = "";
    playerCards.innerHTML = "";
    createPlayerCards();
    createComputerCards();
  });
});

startButton.addEventListener("click", () => {
  boardGame.style.display = "flex";
  createPlayerCards();
  createComputerCards();
  startScreen.style.display = "none";
});

function createPlayerCards() {
  for (let x = 0; x < 5; x++) {
    const randomValue = Math.floor(Math.random() * cards.length);
    const newCard = document.createElement("div");
    newCard.style.backgroundImage = `url(${cards[randomValue].img})`;
    newCard.classList.add("card");
    playerCards.append(newCard);
    newCard.value = cards[randomValue].name;
  }
}

function createComputerCards() {
  for (let x = 0; x < 5; x++) {
    const randomValue = Math.floor(Math.random() * cards.length);
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
    const flipCardInner = document.createElement("div");
    flipCardInner.classList.add("flip-card-inner");
    const back = document.createElement("div");
    back.classList.add("flip-card-back");
    const backImage = document.createElement("img");
    backImage.src = cards[randomValue].img;
    back.append(backImage);
    const front = document.createElement("div");
    const frontImage = document.createElement("img");
    frontImage.src = "https://i.pinimg.com/736x/90/86/29/908629db5279219c2065a9060bace2c3--card-ui-trading-cards.jpg";
    front.classList.add("flip-card-front");
    front.append(frontImage);
    flipCardInner.append(front);
    flipCardInner.append(back);
    flipCard.append(flipCardInner);
    flipCard.value = cards[randomValue].name;
    computerCards.append(flipCard);
  }
}

function computerChoice() {
  const arrayOfCards = document.querySelectorAll(".computerCards .flip-card");
  const randomValue = Math.floor(Math.random() * arrayOfCards.length);
  const choice = arrayOfCards[randomValue];
  choice.firstChild.classList.add("computerChoice");
  setTimeout(() => {
    choice.remove();
  }, 1500);

  return choice.value;
}

playerCards.addEventListener("click", (evt) => {
  if (checker === true) {
    if (evt.target.classList.contains("card")) {
      for (let x of playerCards.children) {
        x.classList.remove("clicked");
      }
      let cardClicked = evt.target;
      cardClicked.classList.add("clicked");
      playerChoice = cardClicked.value;
    }
  } else return;
});

function evaluateResult() {
  const computerCard = computerChoice();
  const playerCard = playerChoice;
  const winnerScreen = document.querySelector(".winnerScreen");
  let compInt = parseInt(computerScore.innerText);
  let playerInt = parseInt(playerScore.innerText);
  console.log(
    `Player card is: ${playerCard} and Computer card is ${computerCard}`
  );
  if (playerCard === computerCard) {
    console.log("That's a draw!");
  } else if (
    (playerCard === "paper" && computerCard === "rock") ||
    (playerCard === "rock" && computerCard === "scissor") ||
    (playerCard === "scissor" && computerCard === "paper")
  ) {
    playerScore.innerText = String((playerInt += 1));
  } else if (
    (playerCard === "scissor" && computerCard === "rock") ||
    (playerCard === "rock" && computerCard === "paper") ||
    (playerCard === "paper" && computerCard === "scissor")
  ) {
    computerScore.innerText = String((compInt += 1));
  } else {
    return;
  }

  setTimeout(() => {
    if (playerCards.children.length <= 0 || playerInt === 3 || compInt === 3) {
      console.log("GAME END");
      if (playerInt < compInt) {
        console.log("victory goes to the maachine");
        const loserScreen = document.querySelector(".loserScreen");
        loserScreen.style.display = "flex";
      } else if (playerInt > compInt) {
        console.log("victory goes to the player");
        const winnerScreen = document.querySelector(".winnerScreen");
        winnerScreen.style.display = "flex";
      } else if (compInt == playerInt) {
        console.log("that's a draw");
        const drawScreen = document.querySelector(".drawScreen");
        drawScreen.style.display = "flex";
      }
    }
  }, 2000);
}

turnButton.addEventListener("click", () => {
  if (playerChoice !== "") {
    checker = false;
    evaluateResult();

    playerChoice = "";
    setTimeout(() => {
      document.querySelector(".clicked").remove();
      checker = true;
    }, 1500);
  } else {
    alert("Please select a card");
  }
});
