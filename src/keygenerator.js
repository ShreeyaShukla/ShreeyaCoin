const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Generate a new key pair and convert them to hex-strings
const key = ec.genKeyPair();
const public_key = key.getPublic('hex');
const private_key = key.getPrivate('hex');

// Print the keys to the console
console.log();
console.log('Your public key (also your wallet address, freely shareable)\n', public_key);

console.log();
console.log('Your private key (keep this secret! To sign transactions)\n', private_key);
