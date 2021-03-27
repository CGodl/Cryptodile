const { GENESIS_DATA, GLOBAL_MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');
const hexToBinary = require('hex-to-binary');


class Block {
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new this(GENESIS_DATA); //this = Block
  }

  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      difficulty = Block.adjustDifficulty({originalBlock: lastBlock, timestamp});
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, data, difficulty, nonce);
    } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash
    }); 
  };

  static adjustDifficulty({originalBlock, timestamp}) {
    const { difficulty } = originalBlock;


    if (difficulty < 1) return 1;

    const difference = timestamp - originalBlock.timestamp;

    if (difference > GLOBAL_MINE_RATE) {
      return difficulty - 1;
    } else {
      return difficulty + 1;
    };
  };
};


module.exports = Block;