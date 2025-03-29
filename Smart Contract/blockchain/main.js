const {Blockchain, Transaction} = require('./blockchain');


let bubuCoin = new Blockchain();

bubuCoin.createTransaction(new Transaction('address1', 'address2', 100))
bubuCoin.createTransaction(new Transaction('address2', 'address1', 10))

console.log('\n Starting the miner...');
bubuCoin.minePendingTransactions('dudu-address');
console.log('\n Balance of dudu is', bubuCoin.getBalanceOfAddress('dudu-address'));
console.log('\n Starting the miner again...');
bubuCoin.minePendingTransactions('dudu-address');
console.log('\n Balance of dudu is', bubuCoin.getBalanceOfAddress('dudu-address'));
