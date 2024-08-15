import {PublicKey} from "@solana/web3.js"

const publicKeyUintArray = new Uint8Array([
    
        118, 152, 209, 254, 141, 247, 104,
         41, 238,  25,  54, 175, 171, 227,
        178, 142, 156, 242, 176, 166, 219,
        171,  96,  30,  10,  94, 188,  82,
         95, 248, 156, 126
      
])

const publicKey = new PublicKey(publicKeyUintArray)
console.log(publicKey.toBase58())