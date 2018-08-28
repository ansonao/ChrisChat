class PlugBoard {
  constructor(board) {
    this.connections = board ? board : {}
  }

  addConnection(char1, char2) {
    if (this.connections[char1] === undefined && this.connections[char2] === undefined) {
      this.connections[char1] = char2;
      this.connections[char2] = char1;
      return true;
    } else {
      const exists = this.connections[char1] ? (this.connections[char2] ? [char1, char2] : char1) : (this.connections[char2] ? [char1, char2] : char2);
      console.log(exists);
      console.log(`Connection ${exists} already exists.`);
      return false;
    }
  }

  removeConnection(char) {
    if (this.connections[char]) {
      const output = this.connections[char];
      delete this.connections[char];
      delete this.connections[output];
    } else {
      console.log('Connection does not exist.');
    }
  }

  returnChar(char) {
    return this.connections[char] || char;
  }
}

// Rotor
class Rotor {
  constructor(num, shift) {
    this.config = this.setConfig(num);
    this.shift = shift ? shift: 0;
  }

  setConfig(num) {
    let config = {};
    // let alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
    // let rounds = alphabets.length / 2;
    // for (let i = 0; i < rounds; i++) {
    //   let oneIdx = Math.random() * alphabets.length;
    //   let char1 = alphabets.splice(oneIdx, 1);
    //   let twoIdx = Math.random() * alphabets.length;
    //   let char2 = alphabets.splice(twoIdx, 1);
    //   config[char1] = char2[0];
    //   config[char2] = char1[0]; 
    // }
    if (num === 1) {
      config = {w: 'p', p: 'w', d: 'q', q: 'd', h: 'f', f: 'h', c: 'u', u: 'c', m: 'r', r: 'm', z: 'b', b: 'z', y: 'x', x: 'y', l: 's', s: 'l', j: 'v', v: 'j', o: 'g', g: 'o', e: 't', t: 'e', i: 'k', k: 'i', a: 'n', n: 'a' };
    } else if (num === 2) {
      config = {g: 'm', m: 'g', u: 'k', k: 'u', d: 'j', j: 'd', q: 'p', p: 'q', x: 'z', z: 'x', c: 'o', o: 'c', h: 'v', v: 'h', f: 'a', a: 'f', i: 'n', n: 'i', t: 'l', l: 't', e: 'r', r: 'e', w: 'y', y: 'w', s: 'b', b: 's'};
    } else {
      config = {f: 'y', y: 'f', w: 'c', c: 'w', o: 'h', h: 'o', d: 'p', p: 'd', u: 'x', x: 'u', e: 's', s: 'e', t: 'q', q: 't', g: 'r', r: 'g', a: 'z', z: 'a', v: 'b', b: 'v', m: 'n', n: 'm', i: 'j', j: 'i', k: 'l', l: 'k'};
    }
    return config;
  }

  returnChar(char, incoming, solving) {
    let currentCode = char.charCodeAt();
    if (incoming && !solving) {
      currentCode += this.shift;
    }
    if (currentCode > 122) {
      let extra = currentCode - 123;
      currentCode = extra + 97;
    } else if (currentCode < 97) {
      let less = 96 - currentCode;
      currentCode = 122 - less;
    }
    let inputChar = String.fromCharCode(currentCode);
    let outputChar = this.config[inputChar];
    if (solving && !incoming) {
      let outputCode = outputChar.charCodeAt() - this.shift;
      if (outputCode < 97) {
        let less = 96 - outputCode;
        outputCode = 122 - less;
      }
      return String.fromCharCode(outputCode);
    }
    return outputChar;
  }

  shiftRotor() {
    if (this.shift === 25) {
      this.shift = 0;
      return true;
    } else {
      this.shift++;
      return false;
    }
  }
}

class Reflector {
  constructor() {
    this.config = { r: 'n', n: 'r', q: 'z', z: 'q', t: 'l', l: 't', m: 'o', o: 'm', s: 'e', e: 's', k: 'w', w: 'k', i: 'a', a: 'i', u: 'h', h: 'u', v: 'x', x: 'v', y: 'c', c: 'y', f: 'p', p: 'f', j: 'b', b: 'j', g: 'd', d: 'g' };
  }

  reflect(char) {
    return this.config[char];
  }
}

class EnigmaMachine {
  constructor(one, two, three, plugboard) {
    this.RotorOne = new Rotor(1, one);
    this.RotorTwo = new Rotor(2, two);
    this.RotorThree = new Rotor(3, three);
    this.Reflector = new Reflector();
    this.PlugBoard = new PlugBoard(plugboard);
  }

  typeWord(char, decoding) {
    let output = this.PlugBoard.returnChar(char);
    output = this.RotorOne.returnChar(output, true, decoding);
    output = this.RotorTwo.returnChar(output, true, decoding);
    output = this.RotorThree.returnChar(output, true, decoding);
    output = this.Reflector.reflect(output);
    output = this.RotorThree.returnChar(output, false, decoding);
    output = this.RotorTwo.returnChar(output, false, decoding);
    output = this.RotorOne.returnChar(output, false, decoding);
    output = this.PlugBoard.returnChar(output);
    this.RotorOne.shiftRotor();
    if (this.RotorOne.shift === 0) {
      this.RotorTwo.shiftRotor();
      if (this.RotorTwo.shift === 0) {
        this.RotorThree.shiftRotor();
      }
    }
    return output;
  }
  
}

module.exports = {
  EnigmaMachine
}
// console.log('a'.charCodeAt());
// console.log('z'.charCodeAt());
// const theBoard = new PlugBoard();
// theBoard.addConnection('a', 'c');
// theBoard.addConnection('d', 'b');
// console.log(theBoard.connections);
// theBoard.removeConnection('a');
// console.log(theBoard.connections);
// theBoard.removeConnection('b');