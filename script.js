const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

let techs = ["bootstrap",
            "css",
            "electron",
            "firebase",
            "html",
            "javascript",
            "jquery",
            "mongo",
            "node",
            "react"];

let cards = null;

startGame();

function startGame(){
    let cards = createCardsFromTechs(techs);
    shuffleCards(cards);
    initializeCards(cards);
}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard") 
    cards.forEach(card =>{
            let cardElement = document.createElement("div");
            cardElement.id = card.id;
            cardElement.classList.add(CARD);
            cardElement.dataset.icon = card.icon;


            createCardContent(card, cardElement);
            cardElement.addEventListener("click", flipcard);
            gameBoard.appendChild(cardElement);

        
    })


}

function createCardContent(card, cardElement){

        createCardFace(FRONT, card, cardElement);
        createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);

    if(face == FRONT){
        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = "./imgs/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    }else{
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);


}

function shuffleCards(cards){
    let currentIndex = cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]];

    }


}

function createCardsFromTechs(techs){

    let cards = [];
    techs.forEach((tech) => {
        cards.push(createPairFromTech(tech));
    })
    return cards.flatMap(pair => pair)
}

function createPairFromTech(tech){
    return[
        {
            id: CreateIdWithTech(tech),
            icon: tech,
            flipped: false
        },
        {
            id: CreateIdWithTech(tech),
            icon: tech,
            flipped: false
        }
    ]
}

function CreateIdWithTech(tech){
    return tech + parseInt(Math.random() * 1000);
}

function flipcard(){
    this.classList.add("flip")

}

