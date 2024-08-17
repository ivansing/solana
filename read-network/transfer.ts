// import * as dotenv from 'dotenv'
import 'dotenv/config'
import { Connection, Transaction, SystemProgram, sendAndConfirmTransaction, PublicKey, Keypair } from "@solana/web3.js"
import { convertSOLToUSD } from './utils/priceUtils'

const secretKeyStr = process.env.SECRET_KEY

if (!secretKeyStr) {
    console.error('❌ Error: SECRET_KEY is not defined in the environment');
    process.exit(1);
}

const performTransfer = async () => {
    try {
        const secretKeyArray = JSON.parse(secretKeyStr) as number[]

        if (secretKeyArray.length !== 64) {
            throw new Error('Invalid secret key length. It should be 64 bytes.');

        }

        const secretKeyUint8Array = new Uint8Array(secretKeyArray)
        const senderKeypair = Keypair.fromSecretKey(secretKeyUint8Array)

        console.log(`✅ Loaded our own keypair from the environment variable`);

        const supliedToPubkey = process.argv[2]
        if (!supliedToPubkey) {
            console.log('Please provide a public key to send to');
            process.exit(1);
        }

        const toPubkey = new PublicKey(supliedToPubkey)
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");

       

        console.log(`✅ Loaded the destination public key and connected to Solana`);

        const transaction = new Transaction()
        const LAMPORTS_TO_SEND = 5000
        const SOL_TO_SEND = LAMPORTS_TO_SEND / 1_000_000_000;

        const sendSolIntructions = SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey,
            lamports: LAMPORTS_TO_SEND,
        })

        transaction.add(sendSolIntructions)

        const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair])

        console.log(
            `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
        );
        console.log(`Transaction signature is ${signature}!`);

        // Convert SOL To USD
        const usdValue = await convertSOLToUSD(SOL_TO_SEND);
        if(usdValue !== undefined) {
            console.log(`The amount of ${SOL_TO_SEND} SOL is approximately $${usdValue?.toFixed(2)} USD.`);

        }
    }

    catch (error) {
        console.error(`❌ Error: ${error.message}`);
    }
}

performTransfer();





