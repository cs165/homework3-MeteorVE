// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.current_card_id = 0;
    this.words = null;
    this.title = null;
    this.words_list = null;
    this.right_arr = [];
  }

  rebuild_words(){
    for (let word of this.right_arr){
      console.log("[debug] : " + word);
      
      let idx = this.words.indexOf(word);
      console.log("[words] : " + this.words);
      let tmp = [this.words];
      //console.log(this.words.splice(idx, 1));
      
      tmp = this.words.splice(idx, 1);
      tmp = this.words_list.splice(idx, 1);

      //this.words_list = this.words_list.splice(idx, 1).slice();
      console.log("[words] : " + this.words);

    }
    
    console.log(this.words);
    
    this.right_arr = [];
  }

  append_right_record(){
    this.right_arr.push(this.words[this.current_card_id]);
  }

  get_next_card(){
    
    this.current_card_id++;
    if(this.current_card_id == this.words.length){
      this.hide();
      app.results.show();
      return;
    }
    this.new_card(this.words[this.current_card_id], this.words_list[this.current_card_id] );
  }

  show(inner) {
    this.containerElement.classList.remove('inactive');
    //this.reset();

    this.title = inner;
    for(let i=0; i< FLASHCARD_DECKS.length; i++){
      if(inner==FLASHCARD_DECKS[i]['title']){
        this.words = Object.keys(FLASHCARD_DECKS[i]['words']);
        this.words_list = Object.values(FLASHCARD_DECKS[i]['words']);
      }
    }

    console.log("[here] : " + this.words_list);
    this.new_card(this.words[this.current_card_id], this.words_list[this.current_card_id]);
  }

  reshow(){
    this.containerElement.classList.remove('inactive');
    this.new_card(this.words[this.current_card_id], this.words_list[this.current_card_id]);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  new_card(word, def){
    const flashcardContainer = document.querySelector('#flashcard-container');
    
    const card = new Flashcard(flashcardContainer, word, def);
    card.update_tf(); // copy result to local card
  }

  reset(){
    this.current_card_id = 0;
    this.words = null;
    this.title = null;
    this.words_list = null;
    this.wrong_arr = [];
  }
}
