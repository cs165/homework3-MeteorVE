// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.total_right = 0;
    this.total_wrong = 0;
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
    this.compute_result();
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  

  compute_result(){
    document.getElementsByClassName("percent")[0].innerHTML = 100*this.total_right/(this.total_wrong+this.total_right);
    if (100 * this.total_right / (this.total_wrong + this.total_right) != 100){
      document.getElementsByClassName("continue")[0].innerHTML = "Continue";
      // document.getElementsByClassName("continue")[0].onclick = 
    }else{
      document.getElementsByClassName("continue")[0].innerHTML = "Start over?";
      // document.getElementsByClassName("continue")[0].onclick = 

    }
  }

  start_over(){
    this.hide();
    app.flashcards.show(app.flashcards.title);
  }

  update_result(){
    document.querySelector("#results .correct").innerHTML = "" + Number(this.total_right);
    document.querySelector("#results .incorrect").innerHTML = "" + Number(this.total_wrong);

  }

  reset(){
    this.total_right = 0;
    this.total_wrong = 0;
  }
}
