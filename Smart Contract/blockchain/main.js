const SHA256 = require('crypto-js/sha256');
//有空多做code review
class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.Hash = this.caculateHash();
        this.nonce = 0;
    }
    caculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty){
        //while loop 的條件我沒有看得很明白
        while(this.Hash.substring(0, difficulty) != Array(difficulty + 1).join("0")){
            this.nonce++;
            this.Hash = this.caculateHash();
        }
        console.log("Block mined: " + this.Hash);
    }
    caculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficult = 2; //此為操縱變數
        this.pendingTransactions = [];
        this.miningReward = 100;

    } 
    createGenesisBlock(){
        return new Block("01/01/2017", "Genesis block", "0");
    }
    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }
    minePendingTransactions(miningRewardAddress){
        let block = new Block( Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficult);

        console.log("Block sucessfully mined");
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }   

    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }
        return balance
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

bubuCoin.createTransaction(new Transaction('address1', 'address2', 100))
bubuCoin.createTransaction(new Transaction('address2', 'address1', 10))

console.log('\n Starting the miner...');
bubuCoin.minePendingTransactions('dudu-address');
console.log('\n Balance of dudu is', bubuCoin.getBalanceOfAddress('dudu-address'));
console.log('\n Starting the miner again...');
bubuCoin.minePendingTransactions('dudu-address');
console.log('\n Balance of dudu is', bubuCoin.getBalanceOfAddress('dudu-address'));
