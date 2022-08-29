let deckState = document.querySelector('#deck-state');
let buttonShuffle = document.querySelector('.shuffle-button');

buttonShuffle.classList.add('display-block');
deckState.classList.add('display-none');



buttonShuffle.addEventListener('click', function() {
    this.classList.add('display-none');
    deckState.classList.remove('display-none');
})


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
function getArrNums(min, max, count, color) {
  let nums = [];
  while (nums.length < count) {
    let num = color + getRandomInt(min, max);
    if (!nums.includes(num)) {
      nums.push(num);
    }
  }
  return nums;
}
 
let blueCards = getArrNums(1, 12, 12, 'blue/blue');
let brownCards = getArrNums(1, 21, 21, 'brown/brown');
let greenCards = getArrNums(1, 18, 18, 'green/green');
 
let сardsOfAllStages = [];
let cardsOfFirstStage = [];
let cardsOfTwoStage = [];
let cardsOfThreeStage = [];
 
function getCards(cardsArr, count, allCards) {
  let min = 0;
  let max = cardsArr.length;
  let cards = [];
  while (cards.length < count) {
    let card = cardsArr[getRandomInt(min, max)];
    if (!allCards.includes(card) && card !== undefined) {
      cards.push(card);
      allCards.push(card);
    }
  }
  return cards;
}
 
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
 
let greenCardsOfFirstStage = getCards(greenCards, 1, сardsOfAllStages);
let brownCardsOfFirstStage = getCards(brownCards, 2, сardsOfAllStages);
let blueCardsOfFirstStage = getCards(blueCards, 1, сardsOfAllStages);
 
cardsOfFirstStage.push(greenCardsOfFirstStage);
cardsOfFirstStage.push(brownCardsOfFirstStage);
cardsOfFirstStage.push(blueCardsOfFirstStage);
 
cardsOfFirstStage = shuffle(cardsOfFirstStage.flat());
 
let greenCardsOfTwoStage = getCards(greenCards, 2, сardsOfAllStages);
let brownCardsOfTwoStage = getCards(brownCards, 3, сardsOfAllStages);
let blueCardsOfTwoStage = getCards(blueCards, 1, сardsOfAllStages);
 
cardsOfTwoStage.push(greenCardsOfTwoStage);
cardsOfTwoStage.push(brownCardsOfTwoStage);
cardsOfTwoStage.push(blueCardsOfTwoStage);
 
cardsOfTwoStage = shuffle(cardsOfTwoStage.flat());
 
let greenCardsOfThreeStage = getCards(greenCards, 2, сardsOfAllStages);
let brownCardsOfThreeStage = getCards(brownCards, 4, сardsOfAllStages);
let blueCardsOfThreeStage = getCards(blueCards, 0, сardsOfAllStages);
 
cardsOfThreeStage.push(greenCardsOfThreeStage);
cardsOfThreeStage.push(brownCardsOfThreeStage);
cardsOfThreeStage.push(blueCardsOfThreeStage);
 
cardsOfThreeStage = shuffle(cardsOfThreeStage.flat());
 
let deckOfCards = [];
 
deckOfCards.push(cardsOfFirstStage);
deckOfCards.push(cardsOfTwoStage);
deckOfCards.push(cardsOfThreeStage);
 
deckOfCards = deckOfCards.flat();
 
let deck = document.querySelector('.deck');
let lastCard = document.querySelector('.last-card');
deck.addEventListener('click', setCards);

function setCards() {
    let card = deckOfCards.pop();
    const cardLink = `https://raw.githubusercontent.com/pavel8lisenkov/codejam-eldritch/main/assets/MythicCards/${card}.png`;
    const img = document.createElement('img');
    img.src = cardLink;
    img.addEventListener('load', function() {
        lastCard.style.backgroundImage = `url('${cardLink}')`;
        if (deckOfCards.length == 0) {
            deck.style.opacity = 0;
        }
    });
} 

