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

    this.right = 0;
    this.wrong = 0;
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
    definitionSide.textContent = backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  update_tf() {

    //this.right = Number(document.querySelector(".status .correct").innerHTML);
    this.right = app.results.total_right;
    this.wrong = app.results.total_wrong;
    document.querySelector(".status .correct").innerHTML = this.right;
    document.querySelector(".status .incorrect").innerHTML = this.wrong;

  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  addListener() {
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


    //console.log("right : " + this.right);

    this.dragStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  onDragMove(event) {

    //console.log("!this.dragStarted = " + !this.dragStarted);
    if (!this.dragStarted) {
      return;
    }
    //console.log("onDragMove");
    //event.preventDefault();

    this.deltaX = event.clientX - this.originX;
    this.deltaY = event.clientY - this.originY;
    //console.log("deltaX : " + this.deltaX);

    if (this.deltaX >= 150) {
      document.body.style.backgroundColor = "#97b7b7";
      document.querySelector(".status .correct").innerHTML = "" + Number(this.right + 1);

    } else if (this.deltaX <= -150) {
      document.body.style.backgroundColor = "#97b7b7";
      document.querySelector(".status .incorrect").innerHTML = "" + Number(this.wrong + 1);

    } else {
      document.querySelector(".status .correct").innerHTML = "" + Number(this.right);
      document.querySelector(".status .incorrect").innerHTML = "" + Number(this.wrong);


    }

    this.translateX = this.offsetX + this.deltaX;
    this.translateY = this.offsetY + this.deltaY;
    // event.currentTarget.style.transform = 'translate(' +
    //   translateX + 'px, ' + translateY + 'px)';
    this.target.style.transform = 'translate(' +
      this.translateX + 'px, ' + this.translateY + 'px) rotate(' + 0.2 * this.deltaX + 'deg)';

  }

  onDragEnd(event) {
    console.log("onDragEnd ------------------");
    console.log(this.translateX, this.translateY);

    this.dragStarted = false;

    this.offsetX += event.clientX - this.originX;
    this.offsetY += event.clientY - this.originY;
    //console.log("offsetX : " + this.offsetX + " offsetY : " + this.offsetY);
    //console.log("[in DragEnd] : this.deltaX : " + this.deltaX + " this.deltaY" + this.deltaY);


    // reset 
    if (this.deltaX >= 150) {
      document.body.style.backgroundColor = "#d0e6df";

      this.target.style.transform = '';
      this.target.style.transitionDuration = "0.5s";

      app.results.total_right++;
      console.log("[Work ? ] Line 157");
      app.results.update_result();
      document.getElementById("flashcard-container").innerHTML = "";
      app.flashcards.get_next_card();

    } else if (this.deltaX <= -150) {
      document.body.style.backgroundColor = "#d0e6df";
      this.target.style.transform = '';
      this.target.style.transitionDuration = "0.5s";
      document.querySelector(".status .correct").innerHTML = "" + Number(this.right);
    
      app.results.total_wrong++;
      app.results.update_result();
      document.getElementById("flashcard-container").innerHTML = "";
      app.flashcards.get_next_card();
      //app.flashcards.append_wrong_record();

    } else {
      this.target.style.transform = '';
      this.target.style.transitionDuration = "0.5s";
      document.body.style.backgroundColor = "#d0e6df";
      document.querySelector(".status .correct").innerHTML = "" + Number(this.right);
    }
    this.offsetX = 0;
    this.offsetY = 0;
    this.originX = null;
    this.originY = null;

    //app.flashcards.hide();

    //document.body.style.backgroundColor = "#d0e6df";

  }


}
