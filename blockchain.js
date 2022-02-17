const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction{
    constructor(from, to, amt) {
        this.from = from;
        this.to = to;
        this.amt = amt;
        // this.timestamp = Date.now();
      }
    calculate_hash() {
        return SHA256(this.from + this.to + this.amt ).toString();
    }

    sign_in_transaction(signing_key) {
       
        if (signing_key.getPublic('hex') !== this.from) {
            throw new Error('You cannot sign transactions for other wallets!');
        }
        
        const hash_transaction = this.calculate_hash();
        const sig = signing_key.sign(hash_transaction, 'base64');
    
        this.signature = sig.toDER('hex');
    }
    is_mining_valid(){
        if (this.from === null) 
            return true;

        if (this.signature.length === 0 || !this.signature) {
            throw new Error('No signature in this transaction');
        }
    
        const publicKey = ec.keyFromPublic(this.from, 'hex');
        return publicKey.verify(this.calculate_hash(), this.signature);
      }
    

}
class Block {
    constructor(timestamp, transactions, previousHash = '') {
      this.timestamp = timestamp;
      this.transactions =transactions;
      this.previousHash = previousHash;
      this.hash = this.calculate_hash();
      this.nonce=0;
    }
  
    calculate_hash() {
      return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transaction)+this.nonce).toString();
    }

    mine_block(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculate_hash();
        }
    
        console.log("Block mined: " + this.hash);
      }
    has_transactions_validity() {
        for (const tran of this.transactions) {
          if (!tran.is_mining_valid()) {
            return false;
          }
        }
        return true;
      }
}
class Blockchain
{
    constructor() {
        this.chain = [this.create_first_block()];
        this.difficulty = 2;
        this.pending_transactions = [];
        this.mining_rewards = 100;
      }
      create_first_block() {
        return new Block("15/02/2022", "Genesis block", "0");
      }

      get_last_block() {
        return this.chain[this.chain.length - 1];
      }

      mine_pending(reward_address) {
        // const rewardTx = new Transaction(null, reward_address, this.mining_rewards);
        // this.pendingTransactions.push(rewardTx);
    
        let block = new Block(Date.now(), this.pending_transactions);
        block.mine_block(this.difficulty);
    
        console.log('Block successfully mined!');
        this.chain.push(block);
    
        this.pending_transactions = [
            new Transaction(null,reward_address, this.mining_rewards)
        ];
      }
    is_valid_chain(){
        for (let i = 1; i < this.chain.length; i++) {
            const current_block = this.chain[i];
            const previous_block = this.chain[i - 1];

            if (!current_block.has_transactions_validity()) {
                return false;
            }

            if (current_block.hash !== current_block.calculate_hash()) {
                return false;
            }

            if (current_block.previousHash !== previous_block.hash) {
              return false;
            }
        }
        return true;
    }
    add_transaction(transaction){
        if (!transaction.from || !transaction.to) {
            console.log('Transaction must include from and to address');
        }

        if (!transaction.is_mining_valid()) {
            console.log('Cannot add invalid transaction to chain');
        }
          
        if (transaction.amt <= 0) {
            console.log('Transaction amount should be higher than 0');
        }

        if (this.get_balance(transaction.from) < transaction.amt) {
            console.log('Not enough balance');
        }

        this.pending_transactions.push(transaction);
        console.log('transaction added: %s', transaction);
        }

       get_balance(address) {
        let balance = 0;
    
        for (const block of this.chain) {
          for (const trans of block.transactions) {
            if (trans.from === address) {
              balance -= trans.amt;
            }
    
            if (trans.to === address) {
              balance += trans.amt;
            }
          }
        }
    
        // console.log('getBalanceOfAdress: %s', balance);
        return balance;
      }

  

}

module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
module.exports.Transaction = Transaction;