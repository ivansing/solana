import {Keypair} from "@solana/web3.js"

const keypair = Keypair.generate()

console.log(`The public key 2 is: ${keypair.publicKey.toBase58()}`)
console.log(`The secret key 2 is: ${keypair.secretKey}`)