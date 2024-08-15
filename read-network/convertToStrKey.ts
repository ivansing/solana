import {PublicKey} from "@solana/web3.js"

const publicKeyUintArray = new Uint8Array([
    
        //<your public key 58 numbers array>
      
])

const publicKey = new PublicKey(publicKeyUintArray)
console.log(publicKey.toBase58())

// generated key