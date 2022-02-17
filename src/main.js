
const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const my_key = ec.keyFromPrivate('3e19d4d536558822d182c77b920d70b7521c43eeb841560ad6c5a031f2e7786f');
// const wallet_address = my_key.getPublic('hex');

// const shreeyaCoin = new Blockchain();

// const transx1 = new Transaction(wallet_address, 'public key', 10);
// transx1.sign_in_transaction(my_key);
// shreeyaCoin.add_transaction(transx1);

// console.log('Is chain valid?',shreeyaCoin.is_valid_chain());

// shreeyaCoin.chain[1].transactions[0].amt=1;


// From that we can calculate your public key (which doubles as your wallet address)
const wallet_address = my_key.getPublic('hex');

// Create new instance of Blockchain class
const shreeyaCoin = new Blockchain();

// Mine first block
shreeyaCoin.mine_pending(wallet_address);

// Create a transaction & sign it with your key
const transx1 = new Transaction(wallet_address, 'address2', 100);
transx1.sign_in_transaction(my_key);
shreeyaCoin.add_transaction(transx1);

// Mine block
shreeyaCoin.mine_pending(wallet_address);

// Create second transaction
const transx2 = new Transaction(wallet_address, 'address1', 50);
transx2.sign_in_transaction(my_key);
shreeyaCoin.add_transaction(transx2);

// Mine block
shreeyaCoin.mine_pending(wallet_address);

console.log();
console.log(`Balance of Shreeya is ${shreeyaCoin.get_balance(wallet_address)}`);

console.log();
console.log('Is Blockchain valid?', shreeyaCoin.is_valid_chain() ? 'Yes' : 'No');
//TESTING BLOCKCHAIN
// let shreeyaCoin = new Blockchain();

//DISPLAYING MINING OF BLOCKS -
// console.log('Mining Block 1' );
// shreeyaCoin.add_block(new Block(1,"16/02/2022",{ amount : 4}));
// console.log('Mining Block 2' );
// shreeyaCoin.add_block(new Block(2,"17/02/2022",{ amount : 10}));

//CHECKING VALIDITY OF BLOCKCHAIN -
// console.log('Is blockchain valid? '+shreeyaCoin.is_valid_chain());

// shreeyaCoin.chain[1].data={ amount : 100};

// console.log('Is blockchain valid?'+shreeyaCoin.is_valid_chain());

//console.log(JSON.stringify(shreeyaCoin, null, 4));

//checking mining rewards , transactions and balance functionality

// shreeyaCoin.create_transaction(new Transaction('address1','address2',100));
// shreeyaCoin.create_transaction(new Transaction('address2','address1',50));

//start mining
console.log('\nstarting the miner');
shreeyaCoin.mine_pending(wallet_address);

console.log('\nBalance of Shreeya is',shreeyaCoin.get_balance(wallet_address));

// console.log('\nstarting the miner again');
// shreeyaCoin.mine_pending('shreeya-address');

// console.log('\nBalance of Shreeya is',shreeyaCoin.get_balance('shreeya-address'));






