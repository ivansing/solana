import { LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js"
import {conn} from './connect'

const publicKey = new PublicKey("8yxGGzhfXNjfkYtLrRHrYudJhBPKM8GtaTMBX1UKE45b")
const connecction = conn()
const balanceInLamports = await connecction.getBalance(publicKey)
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL

console.log(
    `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
  );