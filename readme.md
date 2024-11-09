# encryptor-e2e

`encryptor-e2e` is a Node.js package for end-to-end encrypted communication, making it easy to securely send and receive messages using a combination of RSA and AES encryption. The package includes high-level functions that streamline the encryption and decryption processes, reducing the complexity for developers.

## Features

- **End-to-End Encryption**: Uses RSA for secure key exchange and AES for message encryption.
- **High-Level API**: Simple functions for sending and receiving encrypted messages.
- **Secure Key Management**: Generates RSA key pairs and random symmetric keys.
- **Easy Integration**: Ideal for secure chat applications, message systems, and any project requiring confidentiality.

## Installation

Install the package via npm:

```bash
npm install encryptor-e2e
```

## Usage
The following example demonstrates how to use e2e-secure-messaging for secure messaging between two parties, Alice and Bob.

## Import the Library
```bash
const secureMessaging = require("encryptor-e2e");
```

## Generate Key Pairs
Each user (e.g., Alice and Bob) needs an RSA key pair to securely exchange symmetric keys. This can be generated using generateKeyPair().

```bash
// Generate key pairs for Alice and Bob
const aliceKeys = secureMessaging.generateKeyPair();
const bobKeys = secureMessaging.generateKeyPair();

console.log("Alice's Public Key:", aliceKeys.publicKey);
console.log("Bob's Public Key:", bobKeys.publicKey);
```

## Sending a Secure Message
Alice can send a secure message to Bob by calling sendSecureMessage(). This function:

- Generates a random symmetric key (AES).
- Encrypts the message using AES and the symmetric key.
- Encrypts the symmetric key with Bob’s RSA public key.
The result includes both the encryptedMessage and the encryptedSymmetricKey, which Alice can send to Bob.

```bash
const message = "Hello Bob, this is a secure message!";
const { encryptedMessage, encryptedSymmetricKey } = secureMessaging.sendSecureMessage(
  message,
  aliceKeys.privateKey,
  bobKeys.publicKey
);

console.log("Encrypted Message:", encryptedMessage);
console.log("Encrypted Symmetric Key:", encryptedSymmetricKey);
```


## Receiving a Secure Message
Bob receives the encrypted message and encrypted symmetric key from Alice. He can decrypt the message using receiveSecureMessage(), which:

  - Decrypts the symmetric key using Bob’s private RSA key.
  - Decrypts the message using the decrypted symmetric key.

```bash
const decryptedMessage = secureMessaging.receiveSecureMessage(
  encryptedMessage,
  encryptedSymmetricKey,
  bobKeys.privateKey
);

console.log("Decrypted Message from Alice:", decryptedMessage);  // Outputs: "Hello Bob, this is a secure message!"
```

## API Reference
```generateKeyPair()```
Generates an RSA key pair for secure key exchange.

- Returns: ```{ publicKey, privateKey }``` — The public and private RSA keys.
```sendSecureMessage(message, senderPrivateKey, receiverPublicKey)```

Encrypts a message for end-to-end secure communication.

- Parameters:
  - ```message``` (string): The plaintext message to encrypt.
  - ```senderPrivateKey``` (string): The sender’s private RSA key (for secure identity verification).
  - ```receiverPublicKey``` (string): The receiver’s public RSA key.
- Returns: ```{ encryptedMessage, encryptedSymmetricKey }``` — The encrypted message and encrypted symmetric key.
```bash 
receiveSecureMessage(encryptedMessage, encryptedSymmetricKey, receiverPrivateKey)
```

Decrypts a message that was securely encrypted using sendSecureMessage.

- Parameters:

  ```encryptedMessage``` (string): The encrypted message.
  ```encryptedSymmetricKey``` (string): The encrypted symmetric key.
  ```receiverPrivateKey``` (string): The receiver’s private RSA key for decrypting the symmetric key.
- Returns: ```string``` — The decrypted message.
## Security Best Practices
- Keep Private Keys Secure: The private keys are essential to message decryption and should never be exposed or shared.
- Use HTTPS in Production: If sending encrypted data over the network, always use HTTPS to prevent interception.


### License
[![MIT License](https://img.shields.io/badge/License-MIT-000?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)


## Authors
- [@Rahul Karmakar](https://www.npmjs.com/~rahul28112002)


### Acknowledgments
[![crypto-js](https://img.shields.io/badge/crypto--js-000?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/crypto-js)
[![node-rsa](https://img.shields.io/badge/node--rsa-000?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/node-rsa)