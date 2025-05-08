const SHA256 = require('crypto-js/sha256');
//有空多做code review
class Transaction{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculataHash(){
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }
    signTransaction(signingKey){
        if(signingKey.getPublic('hex') !== this.fromAddress){
            throw new Error("You can't sign transactions for other wallet" );
        }


        const hashTx = this.caculateHash();
        const sig = signingKey.sign(hashTx, 'base64');
        this.signature = sig.toDER('hex');
    }
    isValid(){
        if(this.fromAddress === null) return true;

        if(!this.signature || this.signature.length === 0){
            throw new Error("No signature in this transaction");
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculataHash(), this.signature);
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.Hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    mineBlock(difficulty){
        //一個常見手法，為了使0的個數相同的方法
        while(this.Hash.substring(0, difficulty) != Array(difficulty + 1).join("0")){
            this.nonce++;
            this.Hash = this.calculateHash();
        }
        console.log("Block mined: " + this.Hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficult = 4; //此為操縱變數
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
        ];//給挖礦獎勵
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


module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction