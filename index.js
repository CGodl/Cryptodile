const express = require('express');
const Block = require('./block.js');
const Blockchain = require('./blockchain.js');

const app = express();
const blockchain = new Blockchain();

app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain);
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Started listening at localhost: ${PORT} `)
})