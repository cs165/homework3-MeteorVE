// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText) {
    this.containerElement = containerElement;

    this._flipCard = this._flipCard.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);


    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragStarted = false;
    this.addListener();
    
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  addListener(){
    this.target = document.querySelector(".flashcard-box");
    this.target.addEventListener('pointerdown', this.onDragStart.bind(this));
    this.target.addEventListener('pointermove', this.onDragMove.bind(this));
    this.target.addEventListener('pointerup', this.onDragEnd.bind(this));    
  }

  onDragStart(event) {
    event.preventDefault();
    console.log("onDragStart");
    
    this.originX = event.clientX;
    this.originY = event.clientY;
    console.log(this.target);

    this.dragStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  onDragMove(event) {
    
    console.log("!this.dragStarted = " + !this.dragStarted);
    if (!this.dragStarted) {
      return;
    }
    console.log("onDragMove");
    //event.preventDefault();
    
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    console.log("deltaX : " + deltaX);

    if (deltaX >= 150){
      document.body.style.backgroundColor = "#97b7b7";
      let correct = document.querySelector(".status .correct");
      console.log(correct.innerHTML);
      correct.innerHTML = "" + (Number(correct.innerHTML)+1);
    } else if (deltaX <= -150){
      document.body.style.backgroundColor = "#97b7b7";

    }

    const translateX = this.offsetX + deltaX;
    const translateY = this.offsetY + deltaY;
    // event.currentTarget.style.transform = 'translate(' +
    //   translateX + 'px, ' + translateY + 'px)';
    this.target.style.transform = 'translate(' +
      translateX + 'px, ' + translateY + 'px) rotate(' + 0.2 * deltaX + 'deg)';
      
  }

  onDragEnd(event) {
    console.log("onDragEnd ------------------");

    this.dragStarted = false;
    this.offsetX += event.clientX - this.originX;
    this.offsetY += event.clientY - this.originY;
    console.log("offsetX : " + this.offsetX);

    // reset 
    document.body.style.backgroundColor = "#d0e6df";
    
  }
  
}
