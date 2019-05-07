// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  add_choices(){
    // hardcore
    var choices = document.getElementById("choices");
    
    
    for (var i = 0; i < FLASHCARD_DECKS.length; i++){
      var nDiv = document.createElement("div");
      nDiv.classList.add("choice");
      nDiv.innerHTML = FLASHCARD_DECKS[i].title;
      choices.appendChild(nDiv);
      console.log("pause!");
      
    }
  }
}
