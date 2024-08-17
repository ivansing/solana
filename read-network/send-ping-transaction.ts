// import * as dotenv from "dotenv"
import 'dotenv/config'
import * as web3 from "@solana/web3.js"
import { airdropIfRequired } from "@solana-developers/helpers"
import { conn } from './connect'

// CONSTANTS ADDRESSES
const secretKeyStr = process.env.SECRET_KEY2
if (!secretKeyStr) {
    console.error('❌ Error: SECRET_KEY is not defined in the environment');
    process.exit(1);
}

const secretKeyArray = JSON.parse(secretKeyStr) as number[]
if (secretKeyArray.length !== 64) {
    console.error('❌ Error: Invalid secret key length. It should be 64 bytes.');
    process.exit(1);
}

const payer = web3.Keypair.fromSecretKey(new Uint8Array(secretKeyArray))

const PING_PROGRAM_ADDRESS = new web3.PublicKey(
    "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
);
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
    "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod",
);


if (!payer) {
    console.error('❌ Error: SECRET_KEY is not defined in the environment');
    process.exit(1);
}


const performTrasaction = async () => {
    try {


        console.log(`✅ Loaded our own keypair from the environment variable`);


        const connection = conn()

        let success = false
        let attempts = 0
        const maxAttempts = 3

        // while (!success && attempts < maxAttempts) {
        //     attempts++
        //     try {
        //         const newBalance = await airdropIfRequired(
        //             connection,
        //             payer.publicKey,
        //             1 * web3.LAMPORTS_PER_SOL,
        //             0.5 * web3.LAMPORTS_PER_SOL,
        //         );
        //         success = true
        //         console.log(`✅ Airdrop successful on attempt ${attempts}`)
        //     } catch (airdropError) {
        //         console.warn(`⚠️ Airdrop attempt ${attempts} failed: ${airdropError.message}`)
        //         if (attempts >= maxAttempts) {
        //             throw new Error('Exceeded maximum airdrop attempts');

        //         }
        //     }
        // }


        const transaction = new web3.Transaction()
        const programId = PING_PROGRAM_ADDRESS
        const pingProgramDataId = PING_PROGRAM_DATA_ADDRESS

        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    pubkey: pingProgramDataId,
                    isSigner: false,
                    isWritable: true,
                }
            ],
            programId
        })

        transaction.add(instruction)

        const signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction,
            [payer],
        )

        console.log(`✅ Transaction completed! Signature is ${signature}`)
        console.log(
            `You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
          );
    } catch (error) {
        console.error(`❌ Error: ${error.message}`)
    }
}
performTrasaction()

