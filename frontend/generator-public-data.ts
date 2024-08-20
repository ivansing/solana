import { Keypair } from "@solana/web3.js"
import fs from 'fs'

// Generate a new key ypair for the program ID
const programKeypair = Keypair.generate()
const programId = programKeypair.publicKey.toBase58()


// Generate a new key pair for the data account
const dataAccountKeypair = Keypair.generate()
const dataAccountPubKey = dataAccountKeypair.publicKey.toBase58()


console.log("Program ID:", programId)
console.log("Data Account Public Key:", dataAccountPubKey)
