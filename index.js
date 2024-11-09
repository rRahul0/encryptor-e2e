const CryptoJS = require("crypto-js");
const NodeRSA = require("node-rsa");


// Function to generate RSA key pairs
function generateKeyPair() {
  const key = new NodeRSA({ b: 512 });
  return {
    publicKey: key.exportKey("public"),
    privateKey: key.exportKey("private"),
  };
}

// Generate a random symmetric key (AES)
function generateSymmetricKey() {
  return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
}

// Encrypt a message with AES
function encryptMessage(message, symmetricKey) {
  return CryptoJS.AES.encrypt(message, symmetricKey).toString();
}

// Decrypt a message with AES
function decryptMessage(ciphertext, symmetricKey) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, symmetricKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Encrypt the symmetric key with RSA public key
function encryptSymmetricKey(symmetricKey, publicKey) {
  const rsa = new NodeRSA(publicKey);
  return rsa.encrypt(symmetricKey, "base64");
}

// Decrypt the symmetric key with RSA private key
function decryptSymmetricKey(encryptedKey, privateKey) {
  const rsa = new NodeRSA(privateKey);
  return rsa.decrypt(encryptedKey, "utf8");
}

// High-level function for sending a secure message
function sendSecureMessage(message, senderPrivateKey, receiverPublicKey) {
  const symmetricKey = generateSymmetricKey();
  const encryptedMessage = encryptMessage(message, symmetricKey);
  const encryptedSymmetricKey = encryptSymmetricKey(symmetricKey, receiverPublicKey);
  return { encryptedMessage, encryptedSymmetricKey };
}

// High-level function for receiving a secure message
function receiveSecureMessage(encryptedMessage, encryptedSymmetricKey, receiverPrivateKey) {
  const symmetricKey = decryptSymmetricKey(encryptedSymmetricKey, receiverPrivateKey);
  return decryptMessage(encryptedMessage, symmetricKey);
}

// Export functions
module.exports = {
  generateKeyPair,
  sendSecureMessage,
  receiveSecureMessage,
};