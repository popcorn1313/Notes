const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.Hash = this.caculateHash();
    }
    caculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    } 
    createGenesisBlock(){
        return new Block(0, "01/01/2017", "Genesis block", "0");
    }
    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().Hash;
        newBlock.Hash = newBlock.caculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(var i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.Hash !== currentBlock.caculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.Hash)
                return false;
        }
        return true;
    }
}


let bubuCoin = new Blockchain();
bubuCoin.addBlock(new Block(1, "26/03/2017", {amount: 10}));
bubuCoin.addBlock(new Block(2, "27/03/2017", {amount: 100}));


console.log(bubuCoin.isChainValid());

bubuCoin.chain[1].data = {amount: 100000};
console.log(bubuCoin.isChainValid());
// console.log(JSON.stringify(bubuCoin), null, 4);