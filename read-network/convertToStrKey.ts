import {PublicKey} from "@solana/web3.js"

const publicKeyUintArray = new Uint8Array([
    
        //<your public key>
      
])

const publicKey = new PublicKey(publicKeyUintArray)
console.log(publicKey.toBase58())

// generated key