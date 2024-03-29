/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};

    for (let i = 0; i < this.words.length - 1; i++) {
      let currentWord = this.words[i];
      let nextWord = this.words[i + 1];

      if (!chains[currentWord]) {
        chains[currentWord] = [];
      }

      chains[currentWord].push(nextWord);
    }

    let lastWord = this.words[this.words.length - 1];
    chains[lastWord] = [null];

    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
     // pick a random key to begin
     let keys = Array.from(this.chains.keys());
     let key = MarkovMachine.choice(keys);
     let out = [];
 
     // produce markov chain until reaching termination word
     while (out.length < numWords && key !== null) {
       out.push(key);
       key = MarkovMachine.choice(this.chains.get(key));
     }
     return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};

