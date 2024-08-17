import {Keypair} from "@solana/web3.js"

const keypair2 = Keypair.generate()

console.log(`The public key 2 is: ${keypair2.publicKey.toBase58()}`)
console.log(`The secret key 2 is: ${keypair2.secretKey}`)