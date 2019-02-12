document.addEventListener('DOMContentLoaded', ()=>{
    const game = new Game(cards);
    game.setup();
});

function Game(cards){
    this.game = document.querySelector('.game');
    this.overlay = document.querySelector('.modal-overlay');
    this.modal = document.querySelector('.modal');
    this.restartBtn = document.querySelector('.restart');
    this.cards = cards.concat(cards);
    this.game.addEventListener("click", this.handleCardClick.bind(this));
    this.restartBtn.addEventListener("click", this.reset.bind(this));
}
Game.prototype = {
    setup: function(){
        this.cards = this.shuffleCards(this.cards);
        this.createLayout(this.cards, this.game);
        this.isPaused = false;
        this.guess = null;
    },
    shuffleCards: function(cardsArray){
        return cardsArray.sort(function() { return 0.5 - Math.random() });
    },
    createLayout: function(cardsArray, location){
        const fragment = document.createDocumentFragment();
        cardsArray.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', item.id);

            const inside = document.createElement('div');
            inside.classList.add('inside');

            const frontCard = document.createElement('div');
            frontCard.classList.add('front');

            const frontImage = document.createElement('img');
            frontImage.setAttribute('src', item.img);

            const backCard = document.createElement('div');
            backCard.classList.add('back');

            const backImage = document.createElement('img');
            backImage.setAttribute('src', './images/Symbol.png');

            frontCard.appendChild(frontImage);
            backCard.appendChild(backImage);
            inside.appendChild(frontCard);
            inside.appendChild(backCard);
            card.appendChild(inside);
            fragment.appendChild(card);
        });
        location.appendChild(fragment);
    },
    clearLayout(){
        while (this.game.firstChild) {
            this.game.removeChild(this.game.firstChild);
        }
    },
    handleCardClick: function(e){
        if(!this.isPaused && !e.target.classList.contains("matched") && !e.target.classList.contains("picked")){
            e.target.classList.add("picked");
            if(!this.guess){
                this.guess = e.target;
            } else if(this.guess.parentElement.getAttribute("data-id") === e.target.parentElement.getAttribute("data-id")){
                this.guess.classList.add("matched");
                e.target.classList.add("matched");
                this.guess = null;
            } else {
                this.guess = null;
                this.isPaused = true;
                setTimeout(() =>{
                    document.querySelectorAll('.picked').forEach(item => item.classList.remove("picked"));
                    this.isPaused = false;
                }, 600);
            }
            if(document.querySelectorAll('.matched').length === document.querySelectorAll('.card').length){
                this.win();
            }
        }
    },
    win: function(){
        this.isPaused = true;
        setTimeout(() => {
            this.showModal();
        }, 1000);
    },
    showModal: function(){
        this.overlay.classList.toggle('show');
        this.modal.classList.toggle('show');
    },

    hideModal: function(){
        this.overlay.classList.toggle('show');
        this.modal.classList.toggle('show');
    },

    reset: function(){
        this.hideModal();
        this.clearLayout();
        this.setup();
    }

};
const cards = [
    {
        img: "./images/Meow_Wow.png",
        id: 1,
    },
    {
        img: "./images/Komory_Bat.png",
        id: 2
    },
    {
        img: "./images/Sir_Kyroo.png",
        id: 3
    },
    {
        img: "./images/Toximander.png",
        id: 4
    },
    {
        img: "./images/Fin_Fatale.png",
        id: 5
    },
    {
        img: "./images/Necho_Cat.png",
        id: 6
    },
    {
        img: "./images/Ghostabocky.png",
        id: 7
    },
    {
        img: "./images/Zolephant.png",
        id: 8
    },
    {
        img: "./images/Juggle_Pup.png",
        id: 9
    },
    {
        img: "./images/Chef_Kyroo.png",
        id: 10
    },
    {
        img: "./images/Majik_Lapin.png",
        id: 11
    },
    {
        img: "./images/Aura_Lion.png",
        id: 12
    }

];

