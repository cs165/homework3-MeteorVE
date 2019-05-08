// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);
    this.menu.add_choices();
    // this._bind = this._bind.bind(this);
    this._bind(this);
    //this.choices_touched = this.choices_touched.bind(this);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);




    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
  }

  choices_touched(inner){
    console.log("[here] : " + this);
    console.log(this);
    
    this.menu.hide();
    this.flashcards.show(inner);
  }

  _bind(main){
    var choices = document.querySelectorAll('.choice');
    // console.log(choices);
    var a = 'aa';
    for (var x of choices) {
      x.onclick = this.choices_touched.bind(this, x.innerHTML);
    }

    document.querySelector('.to-menu').onclick =  this.go_to_menu.bind(this);
  
  }

  go_to_menu(){
    this.menu.show();
    this.results.hide();
    this.results.reset();

  }
  

}
